import React from 'react';
import { FaStar, FaTrash } from 'react-icons/fa';

const TaskRow = ({ task, handleTaskCompleted, setEditTask, setDeletedId }) => {
    const { taskTitle, companyName, taskDescription, image, _id } = task;
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row">
                <div className="flex flex-row items-center justify-left">
                    <button onClick={() => setDeletedId(_id)} className='ml-2 hover:bg-yellow-100 p-[7px] rounded-full h-7 w-7'><FaTrash className='text-gray-400 hover:text-red-600' title='delete tasks' /></button>
                    <span className='pl-2 font-medium text-[16px] text-gray-900 whitespace-nowrap dark:text-white'>{taskTitle}</span>
                </div>
            </th>
            <td className="py-4 px-6">
                <span className='font-semibold'>{companyName}</span><br />
                <a href={image} target="_blank" className='text-blue-400 hover:text-blue-700'>{image.slice(0, 30)}</a>
            </td>
            <td className="py-4 px-6 hidden md:block">
                {taskDescription}
            </td>
            <td className="py-1 px-6">
                <div>
                    <button onClick={() => handleTaskCompleted(_id)} class="group relative inline-block text-blue-500 underline hover:text-red-500 duration-300">
                        <FaStar className='text-2xl ml-2 text-gray-300 hover:text-yellow-300' />
                        <span
                            class="absolute hidden group-hover:flex -left-20 -top-2 -translate-y-full w-48 px-2 py-1 bg-gray-400 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-400"
                        >
                            Click when the task is complete
                        </span>
                    </button>
                </div>
            </td>
            <td className="py-4 px-10">
                <button onClick={() => setEditTask(task)} className="font-medium bg-teal-500 py-1 px-3 rounded-md text-white hover:bg-blue-500 dark:text-blue-500">Edit</button>
            </td>
        </tr>
    );
};

export default TaskRow;