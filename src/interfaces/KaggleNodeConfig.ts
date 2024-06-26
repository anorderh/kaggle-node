import { Credentials } from "./Credentials";
import { KaggleNodeClientConfig } from "./KaggleNodeClientConfig";

export interface KaggleNodeConfig {
    credentials?: Credentials
    clientOptions?: KaggleNodeClientConfig
}