import { 
    DatasetQuerySorting, 
    DatasetQueryFileTypes, 
    DatasetQueryLicenses } 
from "../enums/DatasetQueryEnums";

export let constants = {
    baseUrl: 'https://www.kaggle.com',
    apiPath: "api/v1",
    timeouts: { // ms
        connect: 5000,
        read: 15000
    },
    envVarNames: {
        cache: "KAGGLEHUB_CACHE",
        baseUrl: "KAGGLE_API_ENDPOINT",
        username: "KAGGLE_USERNAME",
        key: "KAGGLE_KEY",
        usernameJson: "username",
        keyJson: "key",
        credFolder: "KAGGLE_CONFIG_DIR",
        verbosity: "KAGGLEHUB_VERBOSITY",
        disableCache: "DISABLE_KAGGLE_CACHE",
        disableColabCache: "DISABLE_COLAB_CACHE",
        runtimeAddr: "TBE_RUNTIME_ADDR"
    },
    filtering: {
        sortBy: Object.values(DatasetQuerySorting) as string[],
        fileTypes: Object.values(DatasetQueryFileTypes) as string[],
        licenses: Object.values(DatasetQueryLicenses) as string[],
    },
    defaults: {
        datasetQueryParams: {
            'sortBy': DatasetQuerySorting.HOTTEST,
            'filetype': DatasetQueryFileTypes.ALL,
            'license': DatasetQueryLicenses.ALL,
            'tagids': '',
            'search': '',
            'user': '',
            'page': 1,
        }
    }
}