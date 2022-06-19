import Chart from "react-apexcharts";
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChevronUpIcon from "../icons/ChevronUp";
import ChevronDownIcon from "../icons/ChevronDown";
import { makeStyles } from "@mui/styles";

const StatWidget = (props) => {
  const theme = useTheme();
  let { data, dif, ...other } = props;
  const difSize = dif > 0 ? 100 - dif : 100 + dif;
  if (data === undefined) {
    data = {
      date: "",
      dif: 0,
    };
  }

  const chartOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: ["#27c6db"],
    labels: [""],
    plotOptions: {
      radialBar: {
        dataLabels: {
          value: {
            show: false,
          },
        },
        hollow: {
          size: "60%",
        },
        track: {
          background: theme.palette.background.default,
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartSeries = [difSize];

  return (
    <Card {...other}>
      <CardContent
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            ml: 4.7,
          }}
        >
          <Chart
            height="160"
            options={chartOptions}
            series={chartSeries}
            type="radialBar"
            width="160"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
          }}
        >
          <Box
            sx={{
              ml: "10%",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                marginTop: 3.2,
              }}
            >
              <Typography sx={{ color: "#27c6db" }} variant="h2">
                {dif}%
              </Typography>
              <Typography
                sx={{ mt: 2.5, ml: 0.8, color: "#27c6db" }}
                variant="h5"
              >
                Difference
              </Typography>
            </Box>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              sx={{
                ml: 0.5,
              }}
            >
              Sample: {"2022-01-02"} — {data.date}
            </Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor:
                dif >= data.dif
                  ? alpha(theme.palette.success.main, 0.08)
                  : alpha(theme.palette.error.main, 0.08),
              mt: 5,
              marginLeft: 12,
            }}
            variant="rounded"
          >
            {dif >= data.dif ? (
              <ChevronDownIcon
                fontSize="medium"
                sx={{ color: "success.main" }}
              />
            ) : (
              <ChevronUpIcon fontSize="medium" sx={{ color: "error.main" }} />
            )}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatWidget;
