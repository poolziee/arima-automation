import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardHeader,
  CardMedia,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { cardImage } from "../style/theme/cardStyles";
import { format } from "date-fns";

const keys = ["corr", "mae", "mape", "me", "minmax", "mpe", "rmse"];

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

const DetailsPopover = (props) => {
  const { model } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpen}
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Button size="small" variant="outlined" className={classes.button}>
          Details
        </Button>
      </Box>
      <Popover
        keepMounted
        onClose={handleClose}
        open={open}
        anchorReference={"none"}
        classes={{
          root: classes.popoverRoot,
        }}
      >
        <Box
          sx={{
            backgroundColor: "background.default",
            width: 1400,
            p: 3,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                width: 650,
                float: "left",
                mt: 1,
                mr: 1,
              }}
            >
              <Card style={cardImage}>
                <CardMedia
                  component="img"
                  src={`data:image/png;base64, ${model.summary}`}
                />
              </Card>
              <Card style={cardImage} sx={{ mt: 1 }}>
                <Table>
                  <TableBody>
                    <TableRow
                      key={model.date}
                      sx={{
                        "&:last-child td": {
                          border: 0,
                        },
                      }}
                    >
                      {keys.map((key) => (
                        <TableCell>
                          <Typography color="textPrimary" variant="subtitle2">
                            {model[key]}
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            {key.toUpperCase()}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </Box>
            <Box sx={{ width: 650 }}>
              <Card style={cardImage}>
                <CardMedia
                  component="img"
                  src={`data:image/png;base64, ${model.diagnostics}`}
                />
              </Card>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default DetailsPopover;
