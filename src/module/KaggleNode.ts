import { KaggleNodeClient } from "./KaggleNodeClient";
import { DatasetHandle } from "./classes/DatasetHandle";
import { KaggleNodeConfig } from "./interfaces/KaggleNodeConfig";

export class KaggleNode {
    client: KaggleNodeClient;

    constructor(config: KaggleNodeConfig) {
        this.client = new KaggleNodeClient(config.client);
    }

    datasets = {
        view: (handleStr: string) => {
            let handle = new DatasetHandle(handleStr);
            return this.client.get(handle.getViewRoute());
        },
        download: (handleStr: string, path?: string) => {
            let handle = new DatasetHandle(handleStr);

            return this.client.get(handle.getDownloadRoute(
                path != null 
                    ? {['file_name']: path} 
                    : undefined
            ));
        }
    }
}