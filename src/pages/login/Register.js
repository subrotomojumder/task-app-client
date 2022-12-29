import React, { useContext, useState } from 'react';
import { FaGooglePlusG } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider';
import Spinner from '../../components/Spinner';

const Register = () => {
    const [inputInfo, setInputInfo] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { createUser, updateUser, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        createUser(inputInfo.email, inputInfo.password)
            .then(res => {
                updateUser(inputInfo.name)
                    .then(results => {
                        toast.success('create your account!')
                        navigate('/');
                        setIsLoading(false)
                    })
                    .catch(err => {
                        setIsLoading(false)
                        setError(err.message)
                    });
            })
            .catch(err => {
                setIsLoading(false)
                setError(err.message)
            })
    }
    const handleInputValue = e => {
        setInputInfo({ ...inputInfo, [e.target.name]: e.target.value })
    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then(results => {
                toast.success('create your account!')
                navigate('/');
            })
            .then(err => setError(err.message))
    }

    return (
        <div className="card w-2/3 lg:w-1/2 mx-auto my-6 mt-20 bg-base-100">
            <form onSubmit={handleSubmit} >
                <h1 className='text-3xl md:text-4xl font-semibold text-center mb-3 text-gray-600'>Create new account</h1>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input
                        name='name'
                        type="text"
                        id="name"
                        onChange={handleInputValue}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="enter your name"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                        name='email'
                        type="email"
                        id="email"
                        onChange={handleInputValue}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="enter your email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                    <input
                        name='password'
                        type="password"
                        id="password"
                        onChange={handleInputValue}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="enter your password"
                        required
                    />
                    {error && <small className='text-red-600 mt-1 block'>{error}</small>}
                    <label className="text-sm">
                        <span className=''>Already have an account? <Link to='/sign-in' className="hover:underline hover:text-blue-700">Login</Link></span>
                    </label>
                </div>
                <div className='text-center'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-28">{isLoading ? <Spinner h="h-5" w="w-5" color="fill-yellow-500"/> :'register'}</button>
                </div>
                <div className='text-center mt-4'>
                    <p onClick={handleGoogleLogin}><FaGooglePlusG className='text-4xl hover:text-blue-800 mx-auto mb-[-8px]' /> </p>
                    <small>google</small>
                </div>
            </form>
        </div>
    );
};

export default Register;