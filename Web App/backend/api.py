import flask

import cms_general as cms
app=flask.Flask(__name__)

# ======== ENDPOINTS ===========

@app.route("/train_model", methods=['POST'])
def req_train_models():
    data_csv = flask.request.files['file']
    message = cms.train_model(data_csv)
    return message

@app.route("/get_forecast", methods=['GET'])
def req_get_forecast():
    steps = flask.request.args.get('steps')
    forecast = cms.get_forecast(steps)
    return flask.jsonify(forecast)

@app.route("/get_statistics", methods=['GET'])
def req_get_statistics():
    data = cms.get_statistics()
    return flask.jsonify(data)

# response = make_response(json.dumps(data))
# response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')

@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    return response

# ===== Running the api =======
if __name__ == '__main__':
    app.run()