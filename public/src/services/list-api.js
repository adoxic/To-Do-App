const BASE_URL = '/api';

export function getMinerals() {  
    const url = `${BASE_URL}/minerals`;

    return fetch(url)
        .then(res => res.json());

}


export function getMineral(name) {  
    const url = `${URL}/${name}`;
    return fetch(url)
        .then(response => response.json());
}

export function addMineral(mineral) {
    const url = `${URL}/${mineral}`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'applimineralion/json',
        },
        body: JSON.stringify(mineral)
    })
        .then(response => response.json());
}

export function getTypes() {
    const url = `${URL}/types`;
    return fetch(url)
        .then(response => response.json());
}