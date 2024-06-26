import {describe, expect, test} from '@jest/globals';
import dotenv from "dotenv";
import { KaggleNode, Credentials, KaggleNodeConfig, constants, DatasetQuerySorting, DatasetQueryFileTypes, DatasetQueryLicenses } from './../src/index.ts';
import { deriveQueryParams } from './../src/index.ts';

dotenv.config();

describe('datasets', () => {
    let kaggleNode = new KaggleNode({
        credentials: {
            username: process.env.KAGGLE_USER,
            key: process.env.KAGGLE_KEY
        } as Credentials
    });

    test('search datasets', async () => {
        let res = await kaggleNode.datasets.search({
            sortBy: DatasetQuerySorting.VOTES
        });

        expect(res.status).toBe(200);
        expect(res.data[0].id).toBe(661950); // https://www.kaggle.com/datasets/jessicali9530/animal-crossing-new-horizons-nookplaza-dataset
    })

    test ('search datasets, default params', async () => {
        let res = await kaggleNode.datasets.search();

        expect(res.status).toBe(200);
        expect(deriveQueryParams(res.request.path)).toStrictEqual(constants.defaults.datasetQueryParams);
    })
    
    test('view dataset', async () => {
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset';
        let res = await kaggleNode.datasets.view(handleStr);
        
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe("application/json");
    })

    test('list datasets files', async () => {
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset';
        let expectedFilenames = [
            'accessories.csv',   'achievements.csv',
            'art.csv',           'bags.csv',
            'bottoms.csv',       'construction.csv',
            'dress-up.csv',      'fencing.csv',
            'fish.csv',          'floors.csv',
            'fossils.csv',       'headwear.csv',
            'housewares.csv',    'insects.csv',
            'miscellaneous.csv', 'music.csv',
            'other.csv',         'photos.csv',
            'posters.csv',       'reactions.csv'
          ]

        let res = await kaggleNode.datasets.list(handleStr);
        let grabbedFilenames = res.data.datasetFiles.map(e => e.nameNullable);
        expect(new Set(expectedFilenames)).toEqual(new Set(grabbedFilenames));
    })

    test('download dataset zip', async () => {
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset';
        let res = await kaggleNode.datasets.download(handleStr);
        
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('application/zip');
    })

    test('download dataset, specific file', async () => {
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset';
        let path = 'art.csv';
        let res = await kaggleNode.datasets.download(handleStr, path);
        
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('text/csv');
    })
});