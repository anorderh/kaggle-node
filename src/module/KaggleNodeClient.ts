import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Credentials } from "./interfaces/Credentials";
import { constants } from "./constants/constants";
import { KaggleNodeClientConfig } from "./interfaces/KaggleNodeClientConfig";

export class KaggleNodeClient {
    axiosInstance : AxiosInstance;

    constructor(config: KaggleNodeClientConfig) {
        this.axiosInstance = axios.create({
            baseURL: [constants.baseUrl, constants.apiPath].join("/"),
            timeout: config.timeout ?? 10000,
            auth: {
                username: config.credentials.username,
                password: config.credentials.key 
            }
        });
    }

    get(path: string, config?: AxiosRequestConfig) {
        return this.axiosInstance({
            method: 'get',
            url: path,
            ...(config ?? [])
        });
    }

    post(path: string, data: any, config?: AxiosRequestConfig) {
        return this.axiosInstance({
            method: 'post',
            url: path,
            data: data,
            ...(config ?? [])
        });
    }
}