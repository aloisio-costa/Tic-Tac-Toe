const envURL = process.env.REACT_APP_TTT_API_URL;

export async function fetchScore() {
    const apiUrl = envURL;

    try {
        const response = await fetch(apiUrl);
        const score = await response.json();
        return score;
    }
    catch (error) {
        console.log("error: ", error);
    }
}

export async function addScore(winner) {
    const apiUrl = envURL + "/new";
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(winner)
    }
    debugger
    try {
        const response = await fetch(apiUrl, requestOptions);
        const resMessage = await response.text();
        console.log("response: ", resMessage)
    }
    catch (error) {
        console.log("error: ", error);
    }
}

export async function resetScore() {
    const apiUrl = envURL + "/reset";
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }

    try {
        const response = await fetch(apiUrl, requestOptions);
        const resMessage = await response.text();
        console.log("response: ", resMessage)
    }
    catch (error) {
        console.log("error: ", error);
    }

}