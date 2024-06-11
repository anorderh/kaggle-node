import { KaggleNodeClient } from "../KaggleNodeClient";
import { DatasetHandle } from "../classes/DatasetHandle";

export class KaggleNodeDatasets {
    client: KaggleNodeClient;

    constructor(client: KaggleNodeClient) {
        this.client = client;
    }
    
    async download(handleStr: string, path?: string) {
        let handle : DatasetHandle = new DatasetHandle(handleStr);
        return await this.client.get(handle.handleToDownloadUrl());
    }
}