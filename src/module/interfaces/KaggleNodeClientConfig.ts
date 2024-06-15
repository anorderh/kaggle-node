import { Credentials } from "./Credentials";

export interface KaggleNodeClientConfig {
    credentials: Credentials,
    timeout?: number
}