import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
// css
import "./style.scss";
import PrivateRoute from "./utils/PrivateRoute";

const Layout = () => {
   return (
      <>
         <Navbar />
         <Outlet />
         <Footer />
      </>
   );
};

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         {
            path: "/game",
            element: (
               <PrivateRoute>
                  <Game />
               </PrivateRoute>
            ),
         },
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/register",
            element: (
               <div>
                  <Register />
               </div>
            ),
         },
         {
            path: "/login",
            element: (
               <div>
                  <Login />
               </div>
            ),
         },
         {
            path: "*",
            element: <NotFound />,
         },
      ],
   },
]);

const App = () => {
   return (
      <div className="app">
         <RouterProvider router={router} />
      </div>
   );
};

export default App;
