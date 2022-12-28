import React from 'react';
import { FaMarker, FaTrash } from 'react-icons/fa';

const CompleteTaskRow = ({ task, setDeletedId, handleTaskIncomplete }) => {
    const { taskTitle, companyName, image, _id } = task;
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row">
                <div className="flex flex-row items-center justify-left">
                    <button onClick={()=>setDeletedId(_id)} className='ml-2 hover:bg-yellow-100 p-[7px] rounded-full h-7 w-7'><FaTrash className='text-gray-400 hover:text-red-600' title='delete tasks' /></button>
                    <span className='pl-2 font-medium text-[16px] text-gray-900 whitespace-nowrap dark:text-white'>{taskTitle}</span>
                </div>
            </th>
            <td className="py-4 px-6">
                <span className='font-semibold'>{companyName}</span><br />
                <a href={image} target="_blank" className='text-blue-400 hover:text-blue-700'>{image.slice(0, 30)}</a>
            </td>
            <td className="py-1">
                <div>
                    <button onClick={()=> handleTaskIncomplete(_id)} className="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">Not complete</button>
                </div>
            </td>
            <td className="py-4 px-6">
                 <form>
                    <div className="flex">
                        <div className="w-full flex flex-row">
                            <input type="text" className="block p-2 min-w-20  text-sm text-gray-900 bg-gray-50 rounded-l-lg  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="write comment...." required />
                            <button type="submit" className="p-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <FaMarker/>
                            </button>
                        </div>
                    </div>
                </form>

            </td>
        </tr>
    );
};

export default CompleteTaskRow;