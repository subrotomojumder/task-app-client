import React from 'react';
import { Link } from 'react-router-dom';
import note from '../assets/home-background.png'

const GetStarted = () => {
    return (
        <div className='min-h-[97vh] text-center dark:text-white' >
            <img src={note} className="mx-auto mt-3 md:mt-6 lg:mt-10 h-[60vh]" alt="" />
            <h4 className='text-3xl font-thin'>Welcome to Tasks</h4>
            <p className='font-thin mb-6 mt-1 mx-6'>Create your To-do list here. Task app makes managing your time very easy.</p>
            <Link to='/add-tasks'>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-7 rounded py-2 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Details more</button>
            </Link>
        </div>
    );
};

export default GetStarted;