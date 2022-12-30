import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import TaskEditModal from '../../components/TaskEditModal';
import TaskRow from '../../components/TaskRow';
import { AuthContext } from '../../context/AuthProvider';

const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const [deletedId, setDeletedId] = useState(null);
    const [editTask, setEditTask] = useState(null);
    const navigate = useNavigate();
    const { data: myTasks = [], refetch } = useQuery({
        queryKey: ['myTasks', user?.email],
        queryFn: () => fetch(`${process.env.REACT_APP_server_url}/tasks/${user?.email}`).then(res => res.json())
    })
    const handleTaskCompleted = (id) => {
        fetch(`${process.env.REACT_APP_server_url}/tasks/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ completed: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.modifiedCount) {
                    refetch()
                    navigate('/completed-tasks')
                }
            })
    };
    if (!myTasks.length) {
        return <div className='text-center h-[100vh] flex justify-center items-center'>
            <div>
                <p className='text-center text-2xl dark:text-yellow-50'>Empty tasks!!</p>
                <Link to='/add-tasks'><button className='mt-4 bg-yellow-200 py-1 px-2 rounded-lg text-sm font-semibold text-white hover:bg-blue-500'>Add task</button></Link>
            </div>
        </div>
    };
    return (
        <div className=''>
            <div className="overflow-x-auto pt-20 relative shadow-md sm:rounded-lg">
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
                            <th scope="col" className="py-3 px-6 hidden md:block">
                                description
                            </th>
                            <th scope="col" className="py-3 px-4">
                                <div className="flex items-center">
                                    Finished
                                </div>
                            </th>
                            <th scope="col" className="py-3 px-10">
                                <span className="">Update</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {myTasks?.map(task => <TaskRow
                            task={task}
                            handleTaskCompleted={handleTaskCompleted}
                            setDeletedId={setDeletedId}
                            setEditTask={setEditTask}
                            key={task?._id}
                        />)
                        }
                    </tbody>
                </table>
            </div>
            {
                editTask && <TaskEditModal
                    editTask={editTask}
                    setEditTask={setEditTask}
                    refetch={refetch}
                />
            }
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

export default MyTasks;