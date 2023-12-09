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
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyClass from "../Pages/Dashboard/MyClass/MyClass";
import AllReqClass from "../Pages/Dashboard/AllReqClass/AllReqClass";
import ClassProgress from "../Pages/Dashboard/ClassProgress/ClassProgress";
import UpdateClass from "../Pages/Dashboard/MyClass/UpdateClass";
import MyClassDetails from "../Pages/Dashboard/MyClass/MyClassDetails";
import EnrolledClassDetails from "../Pages/Dashboard/EnrolledClassDetails/EnrolledClassDetails";
import Profile from "../Pages/Dashboard/Profile/Profile";
import RoleHome from "../Pages/Dashboard/RoleHome/RoleHome";

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
        path: "/teachOnSkillSurge/:email",
        element:<PrivateRoute> <TeachOnSkillSurge></TeachOnSkillSurge> </PrivateRoute>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/singleClass/:id",
        element: (
          <PrivateRoute>
            {" "}
            <SingleClass></SingleClass>
          </PrivateRoute>
        ),
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
      //for student
      {
        path: "myEnrollClasses",
        element: <EnrolledClasses></EnrolledClasses>,
      },
      {
        path: "enrolledClassDetails/:id",
        element: <EnrolledClassDetails></EnrolledClassDetails>,
      },

      //for admin
      {
        path: "users",
        element: (
          <AdminRoute>
            {" "}
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
path: 'roleHome',
element: <RoleHome></RoleHome>
      },
      {
        path: "teacherRequest",
        element: (
          <AdminRoute>
            <TeacherRequest></TeacherRequest>{" "}
          </AdminRoute>
        ),
      },
      {
        path: "allPendingClasses",
        element: <AllReqClass></AllReqClass>,
      },
      {
        path: "class/:id",
        element: <ClassProgress></ClassProgress>,
      },
      {
        path:'profile',
        element: <Profile></Profile>
      },
      //for teacher
      {
        path: "addClass",
        element: <AddClass></AddClass>,
      },
      {
        path: "myClass",
        element: (
          <PrivateRoute>
            <MyClass></MyClass>
          </PrivateRoute>
        ),
      },
      {
        path: "updateClass/:id",
        element: (
          <PrivateRoute>
            {" "}
            <UpdateClass></UpdateClass>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "myClassDetails/:id",
        element: <MyClassDetails></MyClassDetails>,
      },
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
