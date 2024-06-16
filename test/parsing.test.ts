import {describe, expect, test} from '@jest/globals';
import dotenv from "dotenv";
import { KaggleNode, Credentials, DatasetHandle } from '../src/index.ts';

dotenv.config();

describe('parsing', () => {
    let kaggleNode = new KaggleNode({
        client: {
          credentials: {
            username: process.env.KAGGLE_USER,
            key: process.env.KAGGLE_KEY
          } as Credentials
        }
    });    

    test('parse handle', () => {
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset'
        let handle;
        expect(() => {
            handle = kaggleNode.parsing.getHandle(handleStr)
        }).not.toThrow();
        expect(handle.version).toBe(undefined);
    })

    test('parse handle w/ version', () => {
        let handleStrVersion = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset/versions/2';
        let handle;
        expect(() => {
            handle = kaggleNode.parsing.getHandle(handleStrVersion)
        }).not.toThrow()
        expect(handle.version).not.toBe(undefined)
    })

    test('parse invalid handle', () => {
        let invalidParams = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset/versions'
        let invalidVer = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset/versions/baloney';

        expect(() => {
            kaggleNode.parsing.getHandle(invalidParams)
        }).toThrow("Invalid handle string.");
        expect(() => {
            kaggleNode.parsing.getHandle(invalidVer)
        }).toThrow("Version number is malformed.");
    })
});