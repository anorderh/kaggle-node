import {describe, expect, test} from '@jest/globals';
import dotenv from "dotenv";
import { KaggleNode, Credentials, DatasetHandle } from '../src/index.ts';

dotenv.config();

describe('errors', () => {
    let kaggleNode = new KaggleNode();    

    test('unauthorized', async () => {
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset'
        let res = await kaggleNode.datasets.view(handleStr);
        let data = res.data;

        expect(data.code).toBe(401);
        expect(data.message).toBe("Unauthorized access");
    })

    test('invalid dataset', async () => {
        let handleStr = 'anthony4024/dangerous-roads-us';
        // Non-existent dataset yields error 403, not 404?
        // I guess 'dataset/download/...' routes are "forbidden" if resource doesn't exist.
        await expect(
            kaggleNode.datasets.download(handleStr)
        ).rejects.toThrow('Request failed with status code 403')
    })
});