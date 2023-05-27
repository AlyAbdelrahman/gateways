export const fetchGatways = async () => {
    const results = await fetch('http://localhost:5000/projectData');
    const data = await results.json();
    return data;
}
export const updateGatways = async (id, updatedGateway) => {
    const results = await fetch(`http://localhost:5000/projectData/${id}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedGateway)
    });
    const data = await results.json();
    return data;
}

export const AddGatways = async (newGateway) => {
    const results = await fetch(`http://localhost:5000/projectData`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newGateway)
    });
    const data = await results.json();
    return data;
}