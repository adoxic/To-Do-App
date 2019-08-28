import store from './store.js';

const BASE_URL = '/api';

const token = store.getToken();
if(!token && location.pathname !== '/auth.html') {
    const searchParams = new URLSearchParams();
    searchParams.set('redirect', location.pathname);
    location = `auth.html?${searchParams.toString()}`;
}


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

export function putTask(task) {
    const url = `${BASE_URL}/tasks`;
    return fetchWithError(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });
}

export function signUp(user) {
    const url = `${BASE_URL}/auth/signup`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)        
    });
}

export function signIn(credentials) {
    const url = `${BASE_URL}/auth/signin`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)        
    });
}