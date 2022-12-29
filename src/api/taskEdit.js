
export const useEditTask = async (id, updateDoc) => {
    const res = await fetch(`${process.env.REACT_APP_server_url}/tasks/${id}`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updateDoc)
    })
    const data = await res.json();
    return data;
}
