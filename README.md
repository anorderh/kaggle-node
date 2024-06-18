# kaggle-node

NodeJS Library for [Kaggle API](https://www.kaggle.com/docs/api), accessible via npm.

## Installation

```sh
npm i kaggle-node
```

## Development

### Authenticate

Authenticating is only needed to access public resources requiring user consent or private resources.

First, you will need a Kaggle account. You can sign up [here](https://www.kaggle.com/).

After login, you can download your Kaggle API credentials at https://www.kaggle.com/settings by clicking on the "Create New Token" button under the "API" section.

```
{"username":[YOUR_USERNAME],"key":[YOUR_KEY]}
```

### Usage

Import and create `KaggleNode` object.
```ts
	import { KaggleNode } from 'kaggle-node';
	import { Credentials, KaggleNodeConfig, KaggleNodeClientConfig } from 'kaggle-node'; // Types, optional.

	let kaggleNode = new KaggleNode({
        client: {
          credentials: {
            username: [YOUR_USERNAME],
            key: [YOUR_KEY]
          }
        }
    });
```

### Datasets

To interact with datasets, parse the associated handle string from the dataset's URL.

If you would like to specify versions, append a `versions` clause followed by the version number. To learn about a dataset's versioning, preview the dataset or visit the dataset's web page and navigate to "Data Explorer" on the right hand side.

Consider https://www.kaggle.com/datasets/jessicali9530/animal-crossing-new-horizons-nookplaza-dataset.

```ts
let handleStr;

handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset';
handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset/versions/2';
```

Preview datasets.

```ts
let res = await kaggleNode.datasets.view(handleStr); // application/json; charset=utf-8
```

Download an entire dataset.

```ts
let res = await kaggleNode.datasets.download(handleStr); // application/zip
```

Download a specific file within a dataset.

```ts
let res = await kaggleNode.datasets.download(handleStr, "accessories.csv"); // text/csv, image/jpeg, etc.
```

[Common MIME types for file responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)

## Roadmap

### To Do

- [X] Datasets
- [ ] Notebooks
- [ ] Colab
- [ ] My kaggle suite knowledge is lacking here

Contributions to this repo are welcome. This library is heavily based off Kaggle's official API repos, I advise referencing their implementation when introducing new features.

### References

https://github.com/Kaggle/kaggle-api

https://github.com/Kaggle/kagglehub/tree/main

## License

kaggle-node is released under the [ISC license](LICENSE.txt).