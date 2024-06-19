import {describe, expect, test} from '@jest/globals';
import dotenv from "dotenv";
import { KaggleNode, Credentials, KaggleNodeConfig } from './../src/index.ts';

dotenv.config();

describe('datasets', () => {
    let kaggleNode = new KaggleNode({
        credentials: {
            username: process.env.KAGGLE_USER,
            key: process.env.KAGGLE_KEY
        } as Credentials
    });
    
    test('dataset metadata', async () => {
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset';
        let res = await kaggleNode.datasets.view(handleStr);
        
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe("application/json");
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