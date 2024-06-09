import axios, {AxiosInstance} from "axios";
import { defaults } from "./constants";

export const axiosInstance : AxiosInstance = axios.create({
    baseURL: [defaults.apiEndpoint, defaults.basePath].join("/"),
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});