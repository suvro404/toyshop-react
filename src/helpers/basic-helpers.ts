import {ICredentials} from "../modules/auth/contexts/AuthContext"
import {IKeyable} from "../type"

export function FetchItems(url:string) {
    return fetch(url)
        .then(response => response.json())
        .catch(err => {throw err});
}

export function Authenticate(url:string, queryData:ICredentials) {
    return fetch(url,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: queryData.email, password: queryData.password})
    })
    .then(status)
    .then(response => response.json())
    .catch(err => {throw err});
}

function status(res:IKeyable) {
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res;
}