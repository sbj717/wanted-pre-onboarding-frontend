import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
    errorElement: <p>Not Found</p>,
  },
  {
    path: "/videos",
    element: <p>Videos</p>,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
