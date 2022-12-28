import React from 'react';
import { toast } from 'react-toastify';

const DeleteModal = ({setDeletedId, deletedId, refetch}) => {
    const handleTaskDeleted = () => {
        fetch(`${process.env.REACT_APP_server_url}/tasks/${deletedId}`, {
            method: "DELETE",
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data)
            if (data?.deletedCount) {
                toast.success("Your task delete success!!")
                setDeletedId(null)
                refetch()
            }
        }).catch(e => toast.error(e.message))
    } 
    return (
        <div className='h-[85vh] pb-20 w-full flex justify-center items-center absolute top-0' style={{backgroundColor: 'rgba(10, 190, 280, 0.2)'}}>
            <div className='w-80  border rounded-2xl shadow-2xl bg-white pt-8 pb-6 px-10 '>
                <h4 className='text-xl font-semibold mb-4'>Confirm the task deleted!</h4>
                <div className='flex justify-center'>
                    <button onClick={handleTaskDeleted} class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
                    <button onClick={()=>setDeletedId(null)} class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;