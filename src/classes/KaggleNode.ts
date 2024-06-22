import { KaggleNodeClient } from "./KaggleNodeClient";
import { DatasetHandle } from "./DatasetHandle";
import { KaggleNodeConfig } from "./../interfaces/KaggleNodeConfig";
import { DatasetQueryOptions } from "../interfaces/DatasetQueryOptions";
import { constants } from "../constants/constants";
import { DatasetQuery } from "./DatasetQuery";

export class KaggleNode {
    private client: KaggleNodeClient;

    constructor(config?: KaggleNodeConfig) {
        this.client = new KaggleNodeClient(
            config?.credentials,
            config?.clientOptions
        );
    }

    datasets = {
        search: (options?: DatasetQueryOptions) => {
            let query = new DatasetQuery(options);
            return this.client.get('datasets/list', {
                params: query.params()
            })
        },  
        view: (handleStr: string) => {
            let handle = new DatasetHandle(handleStr);
            return this.client.get(handle.getViewRoute());
        },
        list: (handleStr: string) => {
            let handle = new DatasetHandle(handleStr);
            return this.client.get(handle.getListRoute());
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