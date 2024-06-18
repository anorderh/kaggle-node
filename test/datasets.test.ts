import {describe, expect, test} from '@jest/globals';
import dotenv from "dotenv";
import { KaggleNode, Credentials } from './../src/index.ts';

dotenv.config();

describe('datasets', () => {
    let kaggleNode = new KaggleNode({
        client: {
          credentials: {
            username: process.env.KAGGLE_USER,
            key: process.env.KAGGLE_KEY
          } as Credentials
        }
    });
    
    test('view dataset', async () => {
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset';
        let res = await kaggleNode.datasets.view(handleStr);
        
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe("application/json; charset=utf-8");
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

    test('download invalid dataset', async () => {
        let handleStr = 'anthony4024/dangerous-roads-us';
        // Non-existent dataset yields error 403, not 404?
        // I guess 'dataset/download/...' routes are "forbidden" if resource doesn't exist.
        await expect(
            kaggleNode.datasets.download(handleStr)
        ).rejects.toThrow('Request failed with status code 403')
    })
});