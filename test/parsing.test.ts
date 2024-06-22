import {describe, expect, test} from '@jest/globals';
import dotenv from "dotenv";
import { DatasetHandle, DatasetQuery } from '../src/index.ts';
import { DatasetQueryOptions } from '../src/interfaces/DatasetQueryOptions.ts';
import { DatasetQuerySorting, DatasetQueryFileTypes, DatasetQueryLicenses } from '../src/index.ts';

dotenv.config();

describe('parsing', () => {
    test('parse handle', () => {
        let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset'
        let handle;
        expect(() => {
            handle = new DatasetHandle(handleStr)
        }).not.toThrow();
        expect(handle.version).toBe(undefined);
    })

    test('parse handle w/ version', () => {
        let handleStrVersion = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset/versions/2';
        let handle;
        expect(() => {
            handle = new DatasetHandle(handleStrVersion)
        }).not.toThrow()
        expect(handle.version).not.toBe(undefined)
    })

    test('parse invalid handle', () => {
        let invalidParams = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset/versions'
        let invalidVer = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset/versions/baloney';

        expect(() => {
            new DatasetHandle(invalidParams)
        }).toThrow("Invalid handle string.");
        expect(() => {
            new DatasetHandle(invalidVer)
        }).toThrow("Version number is malformed.");
    })

    test('parse query', async () => {
        expect(() => {
            new DatasetQuery({
                sortBy: DatasetQuerySorting.UPDATED,
                fileType: DatasetQueryFileTypes.JSON,
                license: DatasetQueryLicenses.GPL,
                search: "tools",
                tagIds: [4141, 1070],
                username: 'rashadrmammadov',
                page: 2,
                minSize: 10,
                maxSize: 10000000
            })
        }).not.toThrow();
    })

    test('parse invalid query', () => {
        let options = {
            sortBy: 'potato',
            fileType: 'potato',
            license: 'potato',
            page: -1,
            minSize: -100,
            maxSize: -100
        };

        for (var prop of Object.keys(options)) {
            expect(() => {
                new DatasetQuery(options)
            }).toThrow();
            delete options[prop];
        }
    })
});