import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Todo from "./pages/Todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
    errorElement: <p>Not Found</p>,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
