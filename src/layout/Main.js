import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import GetStarted from '../pages/GetStarted';
import Navbar from '../pages/shared/Navbar';

const Main = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            {
                user?.uid ?
                    <>
                        <Navbar></Navbar>
                        <Outlet></Outlet>
                    </>
                    : <GetStarted />
            }
        </div>
    );
};

export default Main;