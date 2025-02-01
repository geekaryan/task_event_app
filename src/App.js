import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./components/forms/index";
import Event from "./components/events/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "/event",
    element: <Event />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
