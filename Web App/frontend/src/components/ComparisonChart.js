import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";

import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { string } from "prop-types";
import React, { useState } from "react";
import { cardImage } from "../style/theme/cardStyles";

const ComparisonChart = (props) => {
  const { comp, ...other } = props;
  let series = { act: [], pred: [] };
  let dates = [];
  comp.map((item) => {
    series["act"].push([Date.parse(item.date), item.price_act]);
    series["pred"].push([Date.parse(item.date), item.price_pred]);
    dates.push(Date.parse(item.date));
  });

  console.log(series);

  const theme = useTheme();

  const chartOptions = {
    chart: {
      id: "leet",
      background: "transparent",
      stacked: false,
      events: {
        beforeResetZoom: function (chartContext, opts) {
          return {
            xaxis: {
              min: dates[dates.length - 22],
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
    markers: {
      strokeColors: theme.palette.background.paper,
      size: 4,
    },
    stroke: {
      curve: "straight",
      width: 2,
      dashArray: [0, 4],
    },
    colors: ["#27c6db", "#FFA500"],
    theme: {
      mode: "dark",
      palette: "palette4",
      monochrome: {
        enabled: false,
      },
    },
    xaxis: {
      type: "datetime",
      min: dates[dates.length - 22],
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
    <Box {...other}>
      <Card style={cardImage}>
        <CardHeader title="Natural Gas Price" />
        <CardContent>
          <Box>
            <Chart
              height="420"
              width="800"
              options={chartOptions}
              type="area"
              series={[
                { name: "Actual", data: series.act },
                { name: "Predicted", data: series.pred },
              ]}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ComparisonChart;
