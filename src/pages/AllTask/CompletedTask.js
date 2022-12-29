import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CompleteTaskRow from '../../components/CompleteTaskRow';
import DeleteModal from '../../components/DeleteModal';
import { AuthContext } from '../../context/AuthProvider';

const CompletedTask = () => {
    const { user } = useContext(AuthContext);
    const [deletedId, setDeletedId] = useState('');
    const navigate = useNavigate();
    const { data: completeTasks = [], refetch } = useQuery({
        queryKey: ['completeTasks', user?.email],
        queryFn: () => fetch(`${process.env.REACT_APP_server_url}/tasks/${user?.email}?completed=complete`).then(res => res.json())
    })
    const handleUpdateCompleteTask = (id, updateDoc) => {
        fetch(`${process.env.REACT_APP_server_url}/tasks/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateDoc)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.modifiedCount) {
                    updateDoc?.comment && toast.success('added your comment')
                    refetch()
                }
            }).catch(e => toast.error(e.message))
    }
    if (!completeTasks.length) {
        return <div className='text-center h-[100vh] flex justify-center items-center'>
            <div>
                <p className='text-center text-2xl'>Empty tasks!!</p>
                <Link to='/add-tasks'><button className='mt-4 bg-yellow-200 py-1 px-2 rounded-lg text-sm font-semibold text-white hover:bg-blue-500'>Add task</button></Link>
            </div>
        </div>
    }
    return (
        <div>
            <div className="overflow-x-auto mt-20 relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr><th scope="col" className="py-3 pl-12">
                            <div className="flex items-center">
                                tasks
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                            </div>
                        </th>
                            <th scope="col" className="py-3 px-6">
                                <div className="flex items-center">
                                    company
                                </div>
                            </th>
                            <th scope="col" className="py-3 px-4">
                                <div className="flex items-center">
                                    Finished
                                </div>
                            </th>
                            <th scope="col" className="py-3 pl-6">
                                <span className="">comments</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            completeTasks?.map(task => <CompleteTaskRow
                                task={task}
                                key={task?._id}
                                handleUpdateCompleteTask={handleUpdateCompleteTask}
                                setDeletedId={setDeletedId}
                            />)
                        }
                    </tbody>
                </table>
            </div>
            {deletedId &&
                <DeleteModal
                    setDeletedId={setDeletedId}
                    deletedId={deletedId}
                    refetch={refetch}
                />
            }
        </div>
    );
};

export default CompletedTask;