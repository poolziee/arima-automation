import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";

import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { string } from "prop-types";
import { useState } from "react";
import { format } from "date-fns";

const ForecastChart = (props) => {
  const { data, steps } = props;
  let series = { act: [], pred: [] };
  let dates = [];
  let boundry = Date.parse(data[data.length - steps - 1]["date"]);
  data.map((item) => {
    let date = Date.parse(item.date);
    if (date < boundry) {
      series["act"].push([date, item.price]);
    } else if (date === boundry) {
      series["act"].push([date, item.price]);
      series["pred"].push([date, item.price]);
    } else {
      series["pred"].push([date, item.price]);
    }
    dates.push(Date.parse(item.date));
  });
  const theme = useTheme();
  const points = 30;

  function getTooltip(date, price, color, word) {
    console.log(date, price);
    return (
      '<div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">' +
      date +
      "</div>" +
      '<div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 1; display: flex;">' +
      '<span class="apexcharts-tooltip-marker" style="background-color:' +
      color +
      ';"></span>' +
      '<div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">' +
      '<div class="apexcharts-tooltip-y-group">' +
      '<span class="apexcharts-tooltip-text-y-label">' +
      word +
      '</span><span class="apexcharts-tooltip-text-y-value">' +
      price +
      "</span>" +
      "</div>"
    );
  }

  const chartOptions = {
    chart: {
      id: "leet",
      background: "transparent",
      stacked: false,
      events: {
        beforeResetZoom: function (chartContext, opts) {
          return {
            xaxis: {
              min: dates[dates.length - points],
              max: dates[dates.length - 1],
            },
          };
        },
        beforeZoom: function (chartContext, { xaxis }) {
          let min = dates[0];
          let max = dates[dates.length - 1];
          let cur_min = xaxis.min;
          let cur_max = xaxis.max;

          if (cur_max > max) {
            cur_max = max;
          }
          if (cur_min < min) {
            cur_min = min;
          }
          return {
            xaxis: {
              min: cur_min,
              max: cur_max,
            },
          };
        },
      },
      toolbar: {
        show: true,
      },
    },
    forecastDataPoints: {
      count: [0, steps],
      fillOpacity: 0.5,
      strokeWidth: undefined,
      dashArray: 4,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 0,
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    tooltip: {
      intercept: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        let date = data[0];
        let price = data[1];
        let color = "rgb(39, 198, 219)";
        let word = "Price:";
        if (date > boundry) {
          word = "Predicted:";
          color = "rgb(255, 165, 0)";
        }
        date = format(new Date(date), "dd MMM");
        price = price + " €";
        return getTooltip(date, price, color, word);
      },
    },
    legend: {
      show: false,
    },
    markers: {
      strokeColors: theme.palette.background.paper,
      size: 5,
    },
    stroke: {
      curve: "straight",
      width: 2,
      dashArray: [4, 0],
    },
    colors: ["#FFA500", "#27c6db"],
    theme: {
      mode: "dark",
      palette: "palette4",
      monochrome: {
        enabled: false,
      },
    },
    xaxis: {
      type: "datetime",
      min: dates[dates.length - points],
      max: dates[dates.length - 1],
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + " €";
        },
      },
    },
  };

  return (
    <Chart
      height="680"
      options={chartOptions}
      type="area"
      series={[
        { name: "Price", data: series.pred },
        { name: "Price", data: series.act },
      ]}
    />
  );
};

export default ForecastChart;
