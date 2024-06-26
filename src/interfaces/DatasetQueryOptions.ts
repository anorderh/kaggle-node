export interface DatasetQueryOptions {
    sortBy?: string;
    fileType?: string;
    license?: string;
    search?: string;
    tagIds?: number[];
    username?: string;
    page?: number;
    minSize?: number;
    maxSize?: number;
}