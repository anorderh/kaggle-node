import {describe, expect, test} from '@jest/globals';
import dotenv from "dotenv";
import { KaggleNode, Credentials, DatasetHandle } from '../src/index.ts';
import { AxiosError, isAxiosError } from 'axios';

dotenv.config();

describe('errors', () => {
    let kaggleNode = new KaggleNode({
        credentials: {
            username: process.env.KAGGLE_USER,
            key: process.env.KAGGLE_KEY
        } as Credentials
    });

    test('unauthorized', async () => {
        let kaggleNodeNoAuth = new KaggleNode(); 
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset'
        let res = await kaggleNodeNoAuth.datasets.view(handleStr);
        let data = res.data;

        expect(data.code).toBe(401);
        expect(data.message).toBe("Unauthorized access");
    })

    test('invalid dataset', async () => {
        let handleStr = 'anthony4024/dangerous-roads-us';
        await expect(
            kaggleNode.datasets.download(handleStr)
        ).rejects.toThrow('Request failed with status code 403')
    })

    test('invalid file in dataset', async () => {
        let handleStr = 'rabieelkharoua/predicting-hiring-decisions-in-recruitment-data';
        
        try {
            await kaggleNode.datasets.download(handleStr, 'apples.csv');
            throw new Error("Invalid dataset request did not fail.")
        } catch (err) {
            if (!(err instanceof AxiosError)) {
                throw err;
            }
            expect(err?.response?.status ?? null).toBe(404);
        }
    })
});