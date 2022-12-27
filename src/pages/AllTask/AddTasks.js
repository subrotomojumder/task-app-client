import React from 'react';
import { toast } from 'react-toastify';

const AddTasks = () => {
    const handleSubmit = event => {
        event.preventDefault();
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
                    image: results.data.display_url
                }
                fetch(`${process.env.REACT_APP_server_url}/tasks`, {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
                .then(res => res.json())
                .then(data => {
                    if (data?.acknowledged) {
                        toast.success("added your task information")
                        event.reset();
                    }
                })
                .catch(err => console.error(err.message));
            });
    }
    return (
        <div className='border p-10'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-3xl font-thin mb-6'>Add your tasks</h2>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="taskTitle" id="task-title" className="block pt-3 pb-0 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="task-title" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tasks title</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="taskDescription" id="task-description" className="block pt-3 pb-0 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="task-description" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tasks description</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="companyName" id="company-name" className="block pt-3 pb-0 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="company-name" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company name</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="file" accept='image/*' name="image" id="task-image" className="h-[1px] w-[1px] ml-20" required />
                        <label htmlFor="task-image" className="absolute top-0 border rounded font-semibold text-lg py-[6px] text-center w-full block bg-slate-300">upload image</label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    );
};

export default AddTasks;