import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Playgame from "./pages/Playgame";
import Howtoplay from "./pages/Howtoplay";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
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
            path: "/howtoplay",
            element: (
               <PrivateRoute>
                  <Howtoplay />
               </PrivateRoute>
            ),
         },
         {
            path: "/Playgame",
            element: (
               <PrivateRoute>
                  <Playgame />
               </PrivateRoute>
            ),
         },
         {
            path: "/Leaderboard",
            element: (
               <PrivateRoute>
                  <Leaderboard />
               </PrivateRoute>
            ),
         },
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/register",
            element: <Register />,
         },
         {
            path: "/login",
            element: <Login />,
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
