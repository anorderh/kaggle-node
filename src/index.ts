// src/index.js
import dotenv from "dotenv";;
import { Credentials } from "./module/interfaces/Credentials";
import { AxiosResponse } from "axios";
import { KaggleNode } from "./module/KaggleNode";

// Test methods.
dotenv.config();

async function main() {
  let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset';

  let kaggleNode = new KaggleNode({
    client: {
      credentials: {
        username: process.env.KAGGLE_USER,
        key: process.env.KAGGLE_KEY
      } as Credentials
    }
  });
  let res = await kaggleNode.datasets.view(handleStr);
  console.log(res.status);
  console.log(res.headers);
  console.log(res.data);
}
main();