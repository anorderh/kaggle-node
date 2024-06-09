import { axiosInstance } from "./Axios";
import { defaults } from "./constants";
import { Credentials } from "./interfaces/Credentials";

export class KaggleClient {
    creds: Credentials;

    constructor(creds: Credentials) {
        this.creds = creds;
    }

    async get(path: string) {
        return await axiosInstance({
            method: 'get',
            url: path,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            auth: {
                username: this.creds.username,
                password: this.creds.key 
            }
        });
    }

    async post(path: string, data: any) {
        return await axiosInstance({
            method: 'get',
            url: path,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data: data,
            auth: {
                username: this.creds.username,
                password: this.creds.key 
            }
        });
    }
}