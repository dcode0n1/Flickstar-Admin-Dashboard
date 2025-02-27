export const getFetcher = (url: string ) => fetch(url , {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
}).then(res => res.json());

