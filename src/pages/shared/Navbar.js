import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import pen from '../../assets/nav-pen.png';
import { AuthContext } from '../../context/AuthProvider';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const navLinkStyle = (active) =>{
        if(active){
            const style = "block py-2 pl-3 pr-4 rounded bg-gray-200 text-blue-700 text-[14.5px]";
            return style;
        }else{
            const style = "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-200 hover:text-blue-700 text-[14.5px]";
            return style;
        }
    }

    const navItem = <>
        <li>
            <NavLink to='/completed-tasks' className={({isActive})=> isActive? navLinkStyle(true): navLinkStyle()}>Completed-Tasks</NavLink>
        </li>
        <li>
            <NavLink to='/my-tasks' className={({isActive})=> isActive? navLinkStyle(true): navLinkStyle()}>My-Tasks</NavLink>
        </li>
        <li>
            <NavLink to='/add-tasks' className={({isActive})=> isActive? navLinkStyle(true): navLinkStyle()}>Add-Tasks</NavLink>
        </li>
    </>;

    return (
        <div>
            <nav className="bg-slate-100 px-4 sm:px-4 py-2 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-[1000px] flex flex-wrap items-center justify-between mx-auto">
                    <Link to='/'>
                        <div className="flex items-center">
                            <img src={pen} className="h-6 mr-3 sm:h-9" alt="Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Tasks App</span>
                        </div>
                    </Link>
                    {user?.uid ?
                        <div className="flex md:order-2" onClick={() => setShowMenu(!showMenu)}>
                            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        : <div className='ml-auto'>
                            <Link to='/register'>
                                <button className="py-2 px-3 text-xs mr-1 lg:mr-6 font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 dark:bg-blue-600 dark:hover:bg-blue-700">Register</button>
                            </Link>
                        </div>
                    }
                    <div className='absolute top-14 right-2'>
                        {
                            showMenu &&
                            <ul className="border border-gray-100 rounded-lg shadow-xl bg-gray-50 md:hidden dark:border-gray-700">
                                {navItem}
                            </ul>
                        }
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        {user?.uid &&
                            <ul className="flex flex-col p-1.5 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                                {navItem}
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;