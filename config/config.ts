import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = process.env.projectId;
const projectSecret = process.env.projectSecret;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const options = {
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
};

export const factory = "0xE10AA05Fcbd15Ba004683CA8109E367a5e32c27D";
export const factoryCompared = '0xe10aa05fcbd15ba004683ca8109e367a5e32c27d'
export const marketPlace = "0x0267B48a3D4BcDd334541CD7D2656DF6b6fE7021";
export const USDT = '0x5C60F27A2F569A4F559B5AeF5E0338B85eBe43E3'
export const BUSD = '0x678a7d9e71Ef547D48164a0207836aa37Bbb13c0'
export const BNB = '0x7c13C3B93b6c80E5ff6D47B7ffFB7C599E9D960A'

export const client = ipfsHttpClient(options);

