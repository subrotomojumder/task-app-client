import React, { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../context/AuthProvider';
const AddTasks = () => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [imgUpBtnText, setImgUpBtnText] = useState('Upload image');
    const handleSubmit = event => {
        event.preventDefault();
        setIsLoading(true);
        const image = event.target.image.files[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageBB_key}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(results => {
                const task = {
                    taskTitle: event.target.taskTitle.value,
                    taskDescription: event.target.taskDescription.value,
                    companyName: event.target.companyName.value,
                    image: results?.data?.display_url,
                    userEmail: user?.email,
                }
                fetch(`${process.env.REACT_APP_server_url}/tasks`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data?.acknowledged) {
                            toast.success("added your task information")
                            event.target.reset();
                            setIsLoading(false)
                            setImgUpBtnText("Upload image")
                        }
                    })
                    .catch(err => {
                        toast.error(err.message)
                        setIsLoading(false)
                    });
            });
    }
    const handleImageChange = image => {
        // preview image create url
        // console.log(window.URL.createObjectURL(image));
        setImgUpBtnText(image.name)
    }
    return (
        <div className='w-full md:w-3/5 lg:w-3/4 mx-auto pt-20 '>
            <form onSubmit={handleSubmit} className='border dark:bg-gray-600 dark:shadow-xl p-10'>
                <h2 className='text-3xl font-thin mb-6 dark:text-white'>Add your tasks</h2>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="taskTitle" id="task-title" className="block pt-3 pb-0 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="task-title" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tasks title</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="taskDescription" id="task-description" className="block pt-3 pb-0 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="task-description" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tasks description</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <input onChange={(e) => handleImageChange(e.target.files[0])} type="file" accept='image/*' name="image" id="task-image" className="h-[1px] w-[1px] ml-20" required />
                        <label htmlFor="task-image" className="absolute top-0 border rounded text-lg py-[6px] text-center w-full block bg-slate-300">{imgUpBtnText}</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="companyName" id="company-name" className="block pt-3 pb-0 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="company-name" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company name</label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? <Spinner h="h-5" w="w-5" color="fill-yellow-500"/> :'Submit'}</button>
            </form>
        </div>
    );
};

export default AddTasks;