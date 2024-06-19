import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { constants } from "./../constants/constants";
import { KaggleNodeClientConfig } from "./../interfaces/KaggleNodeClientConfig";
import { Credentials } from "../interfaces/Credentials";

export class KaggleNodeClient {
    axiosInstance : AxiosInstance;

    constructor(creds?: Credentials, config?: KaggleNodeClientConfig) {
        this.axiosInstance = axios.create({
            baseURL: [constants.baseUrl, constants.apiPath].join("/"),
            auth: creds != null
                ? { username: creds?.username, password: creds?.key }
                : undefined,
            timeout: config?.timeout ?? 10000,
        });
    }

    get(path: string, config?: AxiosRequestConfig) {
        return this.axiosInstance({
            method: 'get',
            url: path,
            ...(config ?? {})
        });
    }

    post(path: string, data: any, config?: AxiosRequestConfig) {
        return this.axiosInstance({
            method: 'post',
            url: path,
            data: data,
            ...(config ?? {})
        });
    }
}