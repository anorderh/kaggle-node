import { KaggleNodeClient } from "./KaggleNodeClient";
import { DatasetHandle } from "./DatasetHandle";
import { KaggleNodeConfig } from "./../interfaces/KaggleNodeConfig";

export class KaggleNode {
    private client: KaggleNodeClient;

    constructor(config: KaggleNodeConfig) {
        this.client = new KaggleNodeClient(config.client);
    }

    parsing = {
        getHandle: (handleStr: string) => {
            return new DatasetHandle(handleStr);
        }
    }
    datasets = {
        view: (handleStr: string) => {
            let handle = this.parsing.getHandle(handleStr);
            return this.client.get(handle.getViewRoute());
        },
        download: (handleStr: string, path?: string) => {
            let handle = this.parsing.getHandle(handleStr);
            return this.client.get(handle.getDownloadRoute(
                path != null 
                    ? {['file_name']: path} 
                    : undefined
            ));
        }
    }
}