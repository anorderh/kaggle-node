import { constants } from "../constants/constants";
import { DatasetQueryGroups } from "../enums/DatasetQueryOptions";
import { DatasetQueryOptions } from "../interfaces/DatasetQueryOptions";

export class DatasetQuery {
    options: DatasetQueryOptions;

    constructor(options?: DatasetQueryOptions) {
        this.options = options ?? {};

        // Validate.
        if (!!this.options.sortBy && !constants.filtering.sortBy.includes(this.options.sortBy)) {
            throw new Error(`Invalid sort by specified. Valid options are ${'[ ' + constants.filtering.sortBy.join(", ") + ' ]'}.`)
        }
        if (!!this.options.fileType && !constants.filtering.fileTypes.includes(this.options.fileType)) {
            throw new Error(`Invalid file type specified. Valid options are ${'[ ' + constants.filtering.fileTypes.join(", ") + ' ]'}.`)
        }
        if (!!this.options.license && !constants.filtering.licenses.includes(this.options.license)) {
            throw new Error(`Invalid license specified. Valid options are ${'[ ' + constants.filtering.licenses.join(", ") + ' ]'}.`)
        }
        if ((this.options.page ?? 0) <= 0) {
            throw new Error('Page number must be >= 1.');
        }
        if (!!this.options.minSize && this.options.minSize < 0) {
            throw new Error('Min byte size must be >= 0.');
        }
        if (!!this.options.maxSize && this.options.maxSize <= 0) {
            throw new Error('Max byte size must be > 0.');
        }
        if ((!!this.options.minSize && !!this.options.maxSize) && this.options.minSize > this.options.maxSize) {
            throw new Error('Max byte size must be greater than min byte size.')
        }
    }

    params() {
        let params = {
            ...constants.defaults.datasetQueryParams,
            ...(
                Object.entries({
                    'sortBy': this.options.sortBy,
                    'filetype': this.options.fileType,
                    'license': this.options.license,
                    'tagids': this.options.tagIds,
                    'search': this.options.search,
                    'user': this.options.username,
                    'page': this.options.page,
                    'maxSize': this.options.maxSize,
                    'minSize': this.options.minSize
                }).reduce((obj, [k, v]) => {
                    if (v != undefined) {
                        obj[k] = v;
                    }
                    return obj;
                }, {} as any)
            )
        }

        // Determined by user param's presence.
        params['group'] = params['user']
            ? DatasetQueryGroups.USER
            : DatasetQueryGroups.PUBLIC

        return params;
    }
}