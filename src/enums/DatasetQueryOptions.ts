export enum DatasetQuerySorting {
    HOTTEST = 'hottest',
    VOTES = 'votes',
    UPDATED = 'updated',
    ACTIVE = 'active',
    PUBLUSHED = 'published'
}

export enum DatasetQueryFileTypes {
    ALL = 'all',
    CSV = 'csv',
    SQLITE = 'sqlite',
    JSON = 'json',
    BIGQUERY = 'bigQuery'
}

export enum DatasetQueryLicenses {
    ALL = 'all',
    CC = 'cc',
    GPL = 'gpl',
    ODB = 'odb',
    OTHER = 'other'
}

export enum DatasetQueryGroups {
    PUBLIC = 'public',
    USER ='user'
}