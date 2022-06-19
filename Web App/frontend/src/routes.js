import Forecast from "./pages/Forecast";
import ModelTraining from "./pages/ModelTraining";
import Evaluation from "./pages/Evaluation";
const routes = [
  {
    path: "/",
    element: <Forecast />,
  },
  {
    path: "/model-training",
    element: <ModelTraining />,
  },
  {
    path: "/evaluation",
    element: <Evaluation />,
  },
];
export default routes;
