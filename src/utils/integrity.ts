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

export function deriveQueryParams(path: string, specifyParams?: string[]) {
    let params = path.substring(path.indexOf('?')+1)
        .split('&')
        .reduce((obj: any, option) => {
            let [prop, val] = option.split("=");
            if (specifyParams == undefined || specifyParams.includes(prop)) {
                if (!!val && !isNaN(Number(val))) {
                    obj[prop] = Number(val);
                } else {
                    obj[prop] = val;
                }
            }
            return obj;
        }, {});
    delete params['group']; // 'group' is not included in any input queries.
    return params;
}