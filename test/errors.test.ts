import {describe, expect, test} from '@jest/globals';
import dotenv from "dotenv";
import { KaggleNode, Credentials, DatasetHandle } from '../src/index.ts';

dotenv.config();

describe('errors', () => {
    test('unauthorized', async () => {
        let kaggleNode = new KaggleNode(); 
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset'
        let res = await kaggleNode.datasets.view(handleStr);
        let data = res.data;

        expect(data.code).toBe(401);
        expect(data.message).toBe("Unauthorized access");
    })

    test('invalid dataset', async () => {
        let kaggleNode = new KaggleNode({
            credentials: {
                username: process.env.KAGGLE_USER,
                key: process.env.KAGGLE_KEY
            } as Credentials
        });
        let handleStr = 'anthony4024/dangerous-roads-us';
        await expect(
            kaggleNode.datasets.download(handleStr)
        ).rejects.toThrow('Request failed with status code 403')
    })
});