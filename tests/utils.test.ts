import {describe, expect, test} from '@jest/globals';
import dotenv from "dotenv";;
import { Credentials } from '../src/module/interfaces/Credentials';
import { KaggleNode } from '../src/module/KaggleNode';

dotenv.config();

describe('utils', () => {
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
        expect(() => {
            kaggleNode.utils.parseHandle(handleStr)
        }).not.toThrow();
    })

    test('parse handle w/ version', () => {
        let handleStrVersion = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset/versions/2';
        expect(() => {
            kaggleNode.utils.parseHandle(handleStrVersion)
        }).not.toThrow();
    })

    test('parse invalid handle', () => {
        let invalidParams = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset/versions'
        let invalidVer = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset/versions/baloney';

        expect(() => {
            kaggleNode.utils.parseHandle(invalidParams)
        }).toThrow("Invalid handle string.");
        expect(() => {
            kaggleNode.utils.parseHandle(invalidVer)
        }).toThrow("Version number is malformed.");
    })
});