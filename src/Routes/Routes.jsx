import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/Errorpage";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import TeachOnSkillSurge from "../Pages/TeachOnSkillSurge/TeachOnSkillSurge";
import AllClasses from "../Pages/AllClasses/AllClasses";
import SingleClass from "../Pages/SingleClass";
import Payment from "../Pages/Payment/Payment";

import EnrolledClasses from "../Pages/Dashboard/EnrolledClasses/EnrolledClasses";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Pages/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TeacherRequest from "../Pages/Dashboard/TeacherRequest/TeacherRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/teachOnSkillSurge",
        element: <TeachOnSkillSurge></TeachOnSkillSurge>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/singleClass/:id",
        element: <PrivateRoute>  <SingleClass></SingleClass></PrivateRoute>,
      },
      {
        path: "/payment/:id",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "myEnrollClasses",
        element: <EnrolledClasses></EnrolledClasses>,
      },

      //for admin
      {
        path: "users",
        element: <AdminRoute>  <AllUsers></AllUsers></AdminRoute>,
      },
      {
        path:'teacherRequest',
        element: <AdminRoute><TeacherRequest></TeacherRequest> </AdminRoute> 
      }
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Register></Register>,
  },
]);

export default router;
