import Home from "./pages/Home";
import { createBrowserRouter } from "react-router-dom";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "character/:id",
    element: <DetailPage />
  }
]);

export default router;
