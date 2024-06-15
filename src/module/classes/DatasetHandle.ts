import { constants } from "../constants/constants";

export class DatasetHandle {
    owner: string;
    dataset: string;
    version?: number;

    constructor(handleStr: string) {
        let segments = handleStr.split("/");

        switch (segments.length) {
            case 4:
                let ver = Number(segments[3]);
                if (isNaN(ver)) {
                    throw new Error("Version number is malformed.")
                } else {
                    this.version = ver;
                }
            case 2: {
                this.owner = segments[0];
                this.dataset = segments[1];
                break;
            }
            default: {
                throw new Error("Invalid handle string.")
            }
        }
    }

    getViewRoute() {
        return `datasets/view/${this.owner}/${this.dataset}`;
    }

    getDownloadRoute(added?: { [key: string]: any; }) {
        let params = Object.fromEntries(
            Object.entries({
                'dataset_version_number': this.version,
                ...(added ?? {})
            }).filter(([prop, val]) => val != null)
        );

        return (
            `datasets/download/${this.owner}/${this.dataset}`
            + (
                !!params
                    ? '?' + Object.entries(params)
                        .map(([prop, val]) => `${prop}=${val}`)
                        .join("&")
                    : ''
            )
        )
    }

    getUrl() {
        return (
            `${constants.baseUrl}/datasets/${this.owner}/${this.dataset}`
            + (
                this.version != null
                    ? `/versions/${this.version}`
                    : ''   
            )
        )
    }
}