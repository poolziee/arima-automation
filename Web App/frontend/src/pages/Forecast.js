import React, { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  LinearProgress,
  CircularProgress,
  Box,
  Card,
  CardHeader,
  CardContent,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";

import ForecastChart from "../components/ForecastChart";
import service from "../services/service";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const title = "Forecast";

const useMounted = () => {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
};

const Forecast = () => {
  const mounted = useMounted();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(4);
  const [inputSteps, setInputSteps] = useState(4);

  const useStyles = makeStyles((theme) => ({
    button: {
      "&:hover": {
        color: "#27c6db",
        borderColor: "#27c6db",
      },
    },
  }));
  const classes = useStyles();

  const getData = useCallback(async () => {
    try {
      // set loading to true before calling API
      setLoading(true);
      console.log(inputSteps);
      const data = await service.getData(inputSteps);
      if (mounted.current) {
        setData(data);
        setSteps(inputSteps);
        // switch loading to false after fetch is complete
        setLoading(false);
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted, inputSteps]);

  useEffect(() => {
    getData();
  }, []);

  const handleStepsChange = (value) => {
    setInputSteps((prevState) => {
      return value;
    });
  };

  return Layout(
    <>
      <Box
        sx={{
          marginTop: "0.8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Card sx={{ width: "70%" }}>
          <CardHeader title="Natural Gas Price Forecast" />
          <Box style={{ marginLeft: "41.5%", marginTop: "-3%" }}>
            <TextField
              style={{ width: 80 }}
              type="number"
              label="weeks"
              variant="outlined"
              value={inputSteps}
              InputProps={{ inputProps: { min: 2 } }}
              onChange={(e) => {
                handleStepsChange(e.target.value);
              }}
            />
            <Button
              variant="contained"
              size={"large"}
              onClick={getData}
              sx={{ ml: 2, mt: 0.8 }}
              className={classes.button}
            >
              Forecast
            </Button>
          </Box>
          <CardContent>
            {loading ? (
              <>
                <LinearProgress />
                <Box
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    height: "690px",
                  }}
                >
                  <CircularProgress size={300} />
                </Box>
              </>
            ) : (
              <Box sx={{ height: "100%", width: "100%" }}>
                <ForecastChart data={data} steps={steps} />
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </>,
    title
  );
};

export default Forecast;
