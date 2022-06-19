import React, { useCallback, useEffect, useRef, useState } from "react";
import service from "../services/service";
import Layout from "../components/layout/Layout";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StatWidget from "../components/StatWidget";
import { cardImage } from "../style/theme/cardStyles";
import zIndex from "@mui/material/styles/zIndex";
import ModelHistory from "../components/ModelHistory";
import ComparisonChart from "../components/ComparisonChart";
import ForecastChart from "../components/ForecastChart";

const title = "Evaluation";

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

const Evaluation = () => {
  const theme = useTheme();

  const mounted = useMounted();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      // set loading to true before calling API
      setLoading(true);
      const data = await service.getStatistics();
      if (mounted.current) {
        data.records = data.records.reverse();
        setData(data);
        // switch loading to false after fetch is complete
        setLoading(false);
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getData();
  }, [getData]);

  return Layout(
    <>
      {!loading ? (
        <>
          <Box
            sx={{
              marginTop: "2%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", ml: 18 }}>
              <Box sx={{ mb: 10, textAlign: "center" }}>
                <Typography variant="h2" sx={{ mb: 5, mr: 18 }}>
                  Analytics
                </Typography>
                <Box>
                  <Box sx={{ float: "left", display: "inline", width: 770 }}>
                    <StatWidget
                      data={data.records[0]}
                      dif={data.dif_avg}
                      style={cardImage}
                      sx={{ maxHeight: 170, mb: 1 }}
                    />
                    <ModelHistory data={data.records} style={cardImage} />
                  </Box>
                  <Box sx={{ float: "left", display: "inline", ml: 1 }}>
                    <ComparisonChart
                      comp={data.comparison}
                      sx={{ width: 850 }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h2" sx={{ mb: 5, mr: 12 }}>
                  Summary & Diagnostics
                </Typography>
                <Box>
                  <Card
                    style={cardImage}
                    sx={{ float: "left", display: "inline", width: 770 }}
                  >
                    <CardMedia
                      component="img"
                      src={`data:image/png;base64, ${data.summary}`}
                    />
                  </Card>
                  <Card
                    style={cardImage}
                    sx={{ float: "left", display: "inline", ml: 1, width: 850 }}
                  >
                    <CardMedia
                      component="img"
                      src={`data:image/png;base64, ${data.diagnostics}`}
                    />
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ pb: 2 }} />
        </>
      ) : (
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
      )}
    </>,
    title
  );
};

export default Evaluation;
