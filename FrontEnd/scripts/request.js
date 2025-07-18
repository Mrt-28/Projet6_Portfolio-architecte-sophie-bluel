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

export async function postRessource(url, data){}

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