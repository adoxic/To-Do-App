const BASE_URL = '/api';

export function getList() {  
    const url = `${BASE_URL}/tasks`;

    return fetch(url)
        .then(res => res.json());

}

export function addTask(tasks) {
    const url = `${URL}/${tasks}`;
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(tasks)
    });
}
