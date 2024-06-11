import { constants } from "../constants";

export class DatasetHandle {
    owner: string
    dataset: string
    version?: number

    constructor(handleStr: string) {
        let parts = handleStr.split("/");
        switch (parts.length) {
            case 2:
            case 4: {
                this.owner = parts[0];
                this.dataset = parts[1];

                if (parts.length > 2) {
                    if (isNaN(Number(parts[3]))) {
                        throw new Error("Version number is malformed.")
                    } else {
                        this.version = Number(parts[3]);
                    }
                }
                break;
            }
            default: {
                throw new Error("Invalid handle string.")
            }
        }
    }

    handleToUrl() {
        return (
            `${constants.apiEndpoint}/datasets/${this.owner}/${this.dataset}`
            + (
                this.version != null 
                    ? `/versions/${this.version}`
                    : ''   
            )
        )
    }

    handleToDownloadUrl() {
        return (
            `datasets/download/${this.owner}/${this.dataset}`
            + (
                this.version != null
                    ? `dataset_version_number=${this.version}`
                    : ''
            )
        );
    }
}