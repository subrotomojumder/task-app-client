const useTaskUpdate = async (id, updateDoc) => {
    const res =  await fetch(`${process.env.REACT_APP_server_url}/tasks/${id}`,{
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updateDoc)
    });
    const data = await res.json();
    return data;
}
export default useTaskUpdate;