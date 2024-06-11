import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Credentials } from "./interfaces/Credentials";
import { constants } from "./constants";

export class KaggleNodeClient {
    creds: Credentials;
    axiosInstance : AxiosInstance = axios.create({
        baseURL: [constants.apiEndpoint, constants.basePath].join("/"),
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' },
    });

    constructor(creds: Credentials) {
        this.creds = creds;
    }

    async get(path: string, config?: AxiosRequestConfig) {
        return await this.axiosInstance({
            method: 'get',
            url: path,
            auth: {
                username: this.creds.username,
                password: this.creds.key 
            },
            ...(config ?? [])
        });
    }

    async post(path: string, data: any, config?: AxiosRequestConfig) {
        return await this.axiosInstance({
            method: 'get',
            url: path,
            data: data,
            auth: {
                username: this.creds.username,
                password: this.creds.key 
            },
            ...(config ?? [])
        });
    }
}