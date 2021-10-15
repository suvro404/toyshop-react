import {ICredentials} from "../context/AuthContext"
import {IKeyable} from "../type"

type CallbackFunction = (data:IKeyable) => void;

export function FetchItems(url:string, callback:CallbackFunction) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => console.log(err));
}

export function Authenticate(url:string, queryData:ICredentials, callback:CallbackFunction) {
    fetch(url,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: queryData.email, password: queryData.password})
    })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => console.log("error : ", err));
}