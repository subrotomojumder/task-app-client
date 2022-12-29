import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';

const Main = () => {
    return (
        <div
            className='max-w-[1000px] min-h-[100vh] mx-auto px-4 relative'
            style={{ background: `linear-gradient(to top, rgba(255, 99, 71, 0.1), rgba(0, 0, 0, 0))`, backgroundSize: 'cover' }}
        >
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;