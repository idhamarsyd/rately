import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Error from "./pages/error";
import Login from "./pages/login";
import Movie from "./pages/movie";
import Dashboard from "./pages/dashboard";
import Classification from "./pages/classification";
import CommentData from "./pages/comment-data";
import FilmData from "./pages/film-data";
import Overview from "./pages/overview";
import { store } from "./stores/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    // children: [
    //   {
    //     path: "movie/:movieId",
    //     element: <Movie />,
    //   },
    // ],
  },
  {
    path: "movie/:movieId",
    element: <Movie />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "klasifikasi",
        element: <Classification />,
      },
      {
        path: "comment-data",
        element: <CommentData />,
      },
      {
        path: "film-data",
        element: <FilmData />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
