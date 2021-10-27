import {ICredentials, IKeyable} from "../type"

const productsApiHost = 'https://fortnite-api.theapinetwork.com';
const authApiHost = 'https://reqres.in';

class ApiService {
    apiHost = '';

    constructor(queryType:string) {
        if (queryType === 'auth') {
            this.apiHost = authApiHost + "/api/";
        } else if (queryType === 'products') {
            this.apiHost = productsApiHost + "/";
        }
    }

    fetchItems(query:string) {
        return fetch(this.getApiUrl(query))
            .then(response => response.json())
            .catch(err => {throw err});
    }

    authenticate(query:string, creds:ICredentials) {
        return fetch(this.getApiUrl(query),{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: creds.email, password: creds.password})
        })
        .then(this.processResponseStatus)
        .then(response => response.json())
        .catch(err => {throw err});
    }

    processResponseStatus(res:IKeyable):IKeyable {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res;
    }
    getApiUrl(query:string):string {
        return this.apiHost + query;
    }
}

export default ApiService;