import { format } from "date-fns";
import numeral from "numeral";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import DetailsPopover from "./DetailsPopover";

const ModelHistory = (props) => {
  const { data, ...other } = props;

  return (
    <>
      <Card {...other}>
        <CardHeader title="Training Sessions" />
        <Table>
          <TableBody>
            {data.map((model) => (
              <TableRow
                key={model.date}
                sx={{
                  "&:last-child td": {
                    border: 0,
                  },
                }}
              >
                <TableCell width={100}>
                  <Box sx={{ p: 1 }}>
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="subtitle2"
                    >
                      {format(new Date(model.date), "LLL").toUpperCase()}
                    </Typography>
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="h6"
                    >
                      {format(new Date(model.date), "d")}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textPrimary" variant="subtitle2">
                    {model.price}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {"Actual"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textPrimary" variant="subtitle2">
                    {model.pred}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {"Predicted"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ color: "#27c6db" }}>
                    {model.dif + "%"}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {"DIF"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color={model.a_vary > 0 ? "success.main" : "error.main"}
                    variant="subtitle2"
                  >
                    {model.a_vary > 0 ? "+" + model.a_vary : model.a_vary}%
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {"A-VARY"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color={model.p_vary > 0 ? "success.main" : "error.main"}
                    variant="subtitle2"
                  >
                    {model.p_vary > 0 ? "+" + model.p_vary : model.p_vary}%
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {"P-VARY"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <DetailsPopover model={model} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default ModelHistory;
