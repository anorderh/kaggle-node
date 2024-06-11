import { KaggleNodeClient } from "./KaggleNodeClient";
import { DatasetHandle } from "./classes/DatasetHandle";
import { constants } from "./constants";
import { Credentials } from "./interfaces/Credentials";
import { KaggleNodeDatasets } from "./services/KaggleNodeDatasets";

export class KaggleNode {
    client: KaggleNodeClient;

    // Services.
    datasets: KaggleNodeDatasets

    constructor(creds: Credentials) {
        this.client = new KaggleNodeClient(creds);
        this.datasets = new KaggleNodeDatasets(this.client);
    }
}