import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import joblib
import base64
import io
import re

import matplotlib as mpl


# ====== Settings for the plots ==========

mpl.use('Agg')
text_color = '#ffffff'
facecolor = '#222b36'
mpl.rcParams['text.color'] = text_color
mpl.rcParams['axes.labelcolor'] = text_color
mpl.rcParams['xtick.color'] = text_color
mpl.rcParams['ytick.color'] = text_color
mpl.rcParams['axes.edgecolor'] = text_color
mpl.rcParams["figure.facecolor"] = facecolor
mpl.rcParams['legend.facecolor'] = '#171924'

# ======== Loading all files ===========

model = joblib.load('model.pkl')
hist_df = pd.read_csv('storage/history.csv')
hist_df['date'] = pd.to_datetime(hist_df['date'])
stats_df = pd.read_csv('storage/stats.csv')


# ==================================================== MAIN FUNCTIONS ===============================================



# Returns history + forecast based on steps.                     <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def get_forecast(steps):
    data = hist_df.copy()
    data['date'] = hist_df['date'].dt.strftime('%Y-%m-%d')

    result = model.get_forecast(steps=int(steps))
    pred_df = result.predicted_mean.round(2).reset_index().rename(columns={'index':'date','predicted_mean':'price'})
    pred_df['date'] = pred_df['date'].dt.strftime('%Y-%m-%d')
    pred_df['price'] = pred_df['price'].round(2)
    data = data.append(pred_df, ignore_index=True)
    return data.to_dict('records')




# Returns all statistical data                                    <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def get_statistics():
    global stats_df
    stats_df.fillna('', inplace=True)

    dif_avg = get_avg_dif()
    summary, diagnostics = get_diagnostics(total=True)
    comparison = get_comparison()
    
    return {'dif_avg':dif_avg,
            'summary':summary,
            'diagnostics':diagnostics,
            'comparison':comparison,
            'records':stats_df.to_dict('records')}


# Trains model and saves history & statistics.                    <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def train_model(train_file):
    global model, hist_df, stats_df
    

    df = aggregate_weekly(train_file)

    # -------------  PREPARE VARY & DIFS  -------------

    prev = hist_df['price'].values[-1]
    pred = round(model.get_forecast(steps=1).predicted_mean.values[0], 2)
    act = df['price'].values[-1]
    a_vary = round(((act - prev) / prev) * 100, 2 )
    p_vary = round(((pred - prev) / prev) * 100, 2 )
    dif = abs(round(((pred - act) / act) * 100, 2 ))

    # ------------ TRAIN & CONCAT TO HIST  -------------

    model = model.append(df)

    df.reset_index(inplace=True)
    hist_df = pd.concat([hist_df, df]).sort_values(by='date',ascending=True)

    # ------------- ASSIGN VARY & DIFS -----------------
     
    df['pred'] = pred
    df['dif'] = dif
    df['a_vary'] = a_vary
    df['p_vary'] = p_vary
    df['date'] = df['date'].dt.strftime('%Y-%m-%d')

    # ---------  ASSIGN ACCURACY METRICS -----------

    end = pd.to_datetime(df['date'].values[-1])
    start = end - pd.DateOffset(weeks=20)

    result = model.predict(start = start, end=end)
    result = pd.DataFrame(result).reset_index()

    forecast = result['predicted_mean'].round(2).values
    actual = hist_df.loc[((hist_df['date'] >= start) & (hist_df['date'] <= end)), 'price'].values

    scores = get_accuracy(forecast, actual)
    for key in scores:
        df[key] = round(scores[key], 2)
    
    # -------- ASSIGN SUMMARY & DIAGNOSTICS ---------

    summary, diagnostics = get_diagnostics()
    df['summary'] = summary
    df['diagnostics'] = diagnostics
    stats_df = stats_df.append(df, ignore_index=True)
    
    # Save training
    # hist_df.to_csv('storage/history.csv', index=False)
    # stats_df.to_csv('storage/stats.csv', index=False)
    # joblib.dump(model, 'model.pkl')
    return f"Model successfully trained with data from week: {df['date'].values[-1]}"




# ===================================================== HELPING FUNCTIONS ==================================================
    


# Returns a DataFrame with price_act and price_pred
def get_comparison():
    actual = hist_df.copy()
    forecast = (model.predict(start=hist_df['date'].values[0], end=hist_df['date'].values[-1])
                     .round(2)
                     .reset_index()
                     .rename(columns={'index':'date','predicted_mean':'price'}))
    df = pd.merge(actual,forecast, on='date', suffixes=['_act','_pred'])
    df['date'] = df['date'].dt.strftime('%Y-%m-%d')
    return df.to_dict('records')


# Gets the average difference between the actual and the forecasted values (for 2022 only)
def get_avg_dif():
    index = 208
    act = list(hist_df['price'].values[index:])
    pred = round(model.predict(start=hist_df['date'].values[index], end=hist_df['date'].values[-1]), 2)
    difs = list(abs(round(((pred - act) / act) * 100, 2 )).values)
    return round(sum(difs) / len(difs), 2)


# Retreives the accuracy metrics based on the provided parameters
def get_accuracy(forecast, actual):
    mape = np.mean(np.abs(forecast - actual)/np.abs(actual))  # MAPE
    me = np.mean(forecast - actual)             # ME
    mae = np.mean(np.abs(forecast - actual))    # MAE
    mpe = np.mean((forecast - actual)/actual)   # MPE
    rmse = np.mean((forecast - actual)**2)**.5  # RMSE
    corr = np.corrcoef(forecast, actual)[0,1]   # corr
    mins = np.amin(np.hstack([forecast[:,None], 
                              actual[:,None]]), axis=1)
    maxs = np.amax(np.hstack([forecast[:,None], 
                              actual[:,None]]), axis=1)
    minmax = 1 - np.mean(mins/maxs)             # minmax
    
    return({'mape':mape, 'me':me, 'mae': mae, 
            'mpe': mpe, 'rmse':rmse,
            'corr':corr, 'minmax':minmax})


# Encodes the current plot on the thread to base64 string
def get_encoded_img():
    my_stringIObytes = io.BytesIO()
    plt.savefig(my_stringIObytes, format='jpg')
    my_stringIObytes.seek(0)
    encoded = str(base64.b64encode(my_stringIObytes.read()))
    encoded = encoded.strip("b'").strip("'")
    return encoded


# Gets the summary and diagnostics of the model
def get_diagnostics(total = False):

    # ========= SUMMARY ============
    
    text = str(model.summary().tables[0]) + '\n' + str(model.summary().tables[2])
    y = 3 
    if total:
        text = str(model.summary())
        y = 5
    text = re.sub('(\\n{0,}(?:\[1\]|Warnings).+)+',  '', text)
    plt.figure(figsize=(7.5, y))
    props = (dict(facecolor=facecolor, edgecolor=facecolor))
    plt.text(0.01, 0.05, text, {'fontsize': 10}, fontproperties = 'monospace', bbox=props)
    plt.axis('off')
    plt.tight_layout()
    summary = get_encoded_img()

    # ======= DIAGNOSTICS ==========

    plt.figure()
    fig = model.plot_diagnostics(figsize=(10, 9))
    fig.set_facecolor(facecolor)
    axes = fig.axes
    for ax in axes:
        ax.set_facecolor(facecolor)
    diagnostics = get_encoded_img()


    return summary, diagnostics


# Aggregates mean from a csv file on weekly basis 
def aggregate_weekly(train_file):
    df = pd.read_csv(train_file)
    df['date'] = pd.to_datetime(df['date'])
    return (df.set_index('date')
    .groupby(pd.Grouper(freq='1W'))
    .agg('mean')
    .sort_index(ascending=True)
    .round(2)
    )
