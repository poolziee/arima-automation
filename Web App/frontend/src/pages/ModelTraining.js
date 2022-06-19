import Layout from "../components/layout/Layout";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import service from "../services/service";
import { makeStyles } from "@mui/styles";

const title = "Model Training";

const useStyles = makeStyles((theme) => ({
  popoverRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(3px)",
    backgroundColor: "window.default",
  },
  button: {
    color: "rgba(39,198,219,0.56)",
    borderColor: "rgba(39,198,219,0.56)",
    "&:hover": {
      color: "#27c6db",
      borderColor: "#27c6db",
    },
  },
}));

const ModelTraining = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const classes = useStyles();

  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0]);
  };

  const trainModel = useCallback(async () => {
    try {
      // set loading to true before calling API
      setLoading(true);
      const response = await service.trainModels(file);
      //save the data
      console.log(response);
      setMessage(response);
      // switch loading to false after fetch is complete
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [file]);

  return Layout(
    <Box
      sx={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "40vh",
      }}
    >
      <p style={{ marginRight: "1vh" }}>
        {file ? file.name + " - " + Math.ceil(file.size / 1024) + "KB" : ""}
      </p>
      <Button
        className={classes.button}
        variant="outlined"
        component="label"
        style={{ position: "relative", borderRadius: 0 }}
      >
        Upload File
        <input type="file" onChange={onFileChange} hidden />
      </Button>
      {file ? (
        <Button
          variant="contained"
          component="label"
          style={{ position: "absolute", marginTop: "20vh" }}
          onClick={trainModel}
        >
          Train Model
        </Button>
      ) : (
        ""
      )}
      {message && !loading ? (
        <>
          <Typography
            variant={"h5"}
            style={{ marginTop: "50vh", position: "absolute" }}
            color={"success.main"}
          >
            {message.split(":")[0] + " :"}
          </Typography>
          <Typography
            variant={"h4"}
            style={{ marginTop: "60vh", position: "absolute" }}
            color={"success.main"}
          >
            {message.split(":")[1]}
          </Typography>
        </>
      ) : (
        ""
      )}
      {loading ? (
        <CircularProgress
          style={{ marginTop: "55vh", position: "absolute" }}
          size={80}
        />
      ) : (
        ""
      )}
    </Box>,
    title
  );
};
export default ModelTraining;
