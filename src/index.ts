// src/index.js
import dotenv from "dotenv";;
import { Credentials } from "./module/interfaces/Credentials";
import { AxiosResponse } from "axios";
import { KaggleNode } from "./module/KaggleNode";

function HandleKaggleResponse(p: Promise<AxiosResponse>) {
  p.then((res) => {
    console.log('Response Status:', res.status);
    console.log('Response Data:', res.data);
  })
  .catch((err) => {
    if (err.response) { // Response other than 2xx.
      console.error('Error Response Status:', err.response.status);
      console.error('Error Response Data:', err.response.data);
      console.error('Error Response Headers:', err.response.headers);
    } else if (err.request) { // No response received.
      console.log("No response received");
    } else { // Other, possibly setup error.
      console.error('Error Message:', err.message);
    }
    console.error('Error Config:', err.config);
  });
}

// Test methods.
dotenv.config();
let creds = {
  username: process.env.KAGGLE_USER,
  key: process.env.KAGGLE_KEY
} as Credentials;
let handleStr = 'jessicali9530/animal-crossing-new-horizons-nookplaza-dataset';

let kaggleNode = new KaggleNode(creds);
HandleKaggleResponse(kaggleNode.datasets.download(handleStr))