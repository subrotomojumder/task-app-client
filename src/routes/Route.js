import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddTasks from "../pages/AllTask/AddTasks";
import CompletedTask from "../pages/AllTask/CompletedTask";
import MyTasks from "../pages/AllTask/MyTasks";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/login/Register";
import SignIn from "../pages/login/SignIn";
import GetStarted from '../pages/GetStarted';
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <GetStarted />
            },
            {
                path: '/add-tasks',
                element: <PrivateRoute><AddTasks /></PrivateRoute>
            },
            {
                path: '/my-tasks',
                element: <PrivateRoute><MyTasks /></PrivateRoute>
            },
            {
                path: '/completed-tasks',
                element: <PrivateRoute><CompletedTask /></PrivateRoute>
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/sign-in',
                element: <SignIn />
            }
        ]
    }
])