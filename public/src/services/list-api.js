const BASE_URL = '/api';


function fetchWithError(url, options) {
    return fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => {
                    throw json.error;
                });
            }
        });
}

export function getList() {  
    const url = `${BASE_URL}/tasks`;

    return fetch(url)
        .then(res => res.json());

}

export function addTask(tasks) {
    const url = `${BASE_URL}/tasks`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks)
    });
}
