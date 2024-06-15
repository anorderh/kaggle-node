import { AxiosResponse } from "axios"

const gcsHash = 'x-goog-hash';

export function getMD5ChecksumFromResponse(res: AxiosResponse) : string | null {
    if (gcsHash in res.headers) {
        let val = res.headers[gcsHash] as string;
        for(var checksum of val.split(",")) {
            try {
                let [name, value] = checksum.trim().split("=", 1);
                if (name == "md5") {
                    return value;
                }
            } catch (err) {
                console.log(`Invalid ${gcsHash} header: ${val}`)
                return null;
            }
        }
    }
    return null;
}