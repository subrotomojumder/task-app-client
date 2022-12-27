import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddTasks from "../pages/AllTask/AddTasks";
import CompletedTask from "../pages/AllTask/CompletedTask";
import MyTasks from "../pages/AllTask/MyTasks";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/login/Register";
import SignIn from "../pages/login/SignIn";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <AddTasks/> 
            },
            {
                path: '/add-tasks',
                element: <AddTasks/>
            },
            {
                path: '/my-tasks',
                element: <MyTasks/>
            },
            {
                path: '/completed-tasks',
                element: <CompletedTask/>
            },
        ]
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/sign-in',
        element: <SignIn/>
    }
    
])