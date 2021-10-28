import {ICredentials, IKeyable} from "type.common";

import apiConfig from "api/ApiConfig.json";

interface IFetchConfig {
    method: string,
    headers: IKeyable,
    body?: string
}

class ApiService {
    private apiHost = '';

    constructor(queryType:string) {
        if (queryType === 'auth') {
            this.apiHost = apiConfig.host.authApiHost + "/api/";
        } else if (queryType === 'products') {
            this.apiHost = apiConfig.host.productsApiHost + "/";
        }
    }

    public async getProductData(query:string):Promise<IKeyable> {
        try {
            const response = await this.fetchData(query, 'GET', null);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async authenticate(query:string, creds:ICredentials):Promise<IKeyable> {
        try {
            const response = await this.fetchData(query, 'POST', creds);
            return response;
        } catch (err) {
            throw err;
        }
    }

    private fetchData(reqQuery:string, reqMethod: string, reqData: IKeyable | null):Promise<IKeyable> {
        let apiUrl = this.getApiUrl(reqQuery);
        const config:IFetchConfig = {
            method: reqMethod,
            headers: {'Content-Type': 'application/json'},
        }

        if (reqData) config.body = JSON.stringify(reqData);

        return fetch(apiUrl,config)
            .then(this.processResponseStatus)
            .then(response => response.json())
            .catch(err => {throw err});
    }

    private processResponseStatus(res:IKeyable):IKeyable {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res;
    }
    private getApiUrl(query:string):string {
        return this.apiHost + query;
    }
}

export default ApiService;