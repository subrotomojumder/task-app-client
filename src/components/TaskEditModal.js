import React from 'react';
import { toast } from 'react-toastify';

const TaskEditModal = ({ setEditTask, editTask, refetch }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedTask = {
            taskTitle: event.target.taskTitle.value,
            taskDescription: event.target.taskDescription.value,
            companyName: event.target.companyName.value,
        }
        fetch(`${process.env.REACT_APP_server_url}/tasks/${editTask?._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged) {
                    toast.success("updated task information")
                    event.target.reset();
                    refetch();
                    setEditTask(null);
                }
            })
            .catch(err => toast.error(err.message));
    }
    return (
        <div className='h-[85vh] pb-20 w-full flex justify-center items-center absolute top-0' style={{ backgroundColor: 'rgba(1, 17, 179, 0.1)' }}>
            <form onSubmit={handleSubmit} className='w-5/6 md:w-3/5 lg:w-1/2 border p-6 rounded-xl bg-slate-50 shadow-2xl'>
                <h2 className='text-3xl font-thin mb-3'>Update your Tasks</h2>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="taskTitle" defaultValue={editTask?.taskTitle} id="task-title" className="block pt-3 pb-0 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="task-title" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tasks title</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="taskDescription" defaultValue={editTask?.taskDescription} id="task-description" className="block pt-3 pb-0 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="task-description" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tasks description</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="companyName" defaultValue={editTask?.companyName} id="company-name" className="block pt-3 pb-0 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="company-name" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company name</label>
                </div>
                <div className='flex justify-center gap-4'>
                    <div onClick={() => setEditTask(null)} className="text-white bg-green-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                </div>
            </form>
        </div>
    );
};

export default TaskEditModal;