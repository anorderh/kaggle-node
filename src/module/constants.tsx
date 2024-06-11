export let constants = {
    apiEndpoint: 'https://www.kaggle.com',
    basePath: "api/v1",
    timeouts: {
        connect: 5,
        read: 15
    },
    envVarNames: {
        cache: "KAGGLEHUB_CACHE",
        apiEndpoint: "KAGGLE_API_ENDPOINT",
        username: "KAGGLE_USERNAME",
        key: "KAGGLE_KEY",
        usernameJson: "username",
        keyJson: "key",
        credFolder: "KAGGLE_CONFIG_DIR",
        verbosity: "KAGGLEHUB_VERBOSITY",
        disableCache: "DISABLE_KAGGLE_CACHE",
        disableColabCache: "DISABLE_COLAB_CACHE",
        runtimeAddr: "TBE_RUNTIME_ADDR"
    }
}