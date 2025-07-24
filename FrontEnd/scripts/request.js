export async function getRessource(url){
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
    }
    else{
        const data = await response.json();
        console.log(response.status + " " + response.statusText);
        return data;     
    }
}

export async function postRessource(data, user, token){
    const response = await fetch("http://localhost:5678/api/works",{
        method : "POST",
        headers: {
            "Authorization": user +" "+ token,
            "Accept": "application/json"
        },
        body: data
    });

    if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
    }
    else {
        const data = await response.json();
        console.log(response.status + " " + response.statusText);
        return data;
    }
}

export async function deleteRessource(workId, user, token) {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
            "Authorization": user + " " + token,
            "Accept": "*/*"
        }
    });

    if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
    }
    else {
        console.log(response.status + " " + response.statusText);
    }
}

export async function setConexion(data){
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
    }
    else{
        const data = await response.json();
        console.log(response.status + " " + response.statusText);
        return data;
    }
}