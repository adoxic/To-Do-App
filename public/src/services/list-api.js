const BASE_URL = '/api';

export function getList() {  
    const url = `${BASE_URL}/tasks`;

    return fetch(url)
        .then(res => res.json());

}

export function addTask(task) {
    const url = `${URL}/${task}`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json());
}
