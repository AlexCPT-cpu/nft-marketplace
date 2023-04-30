import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = '2O7jwbbhhA0eiGVFyhvTVoBcmTU';
const projectSecret = '3203afb495405676d364746a0884fe98';
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

export const factory = "0x9b16A72bECd3F3f9354F9EA71751ABC532229a28";
export const factoryCompared = '0x9b16a72becd3f3f9354f9ea71751abc532229a28'
export const marketPlace = "0x76F69BE8739b4B0D8A23c498b880614aA01bA91B"; // new marketplace
export const USDT = '0x5C60F27A2F569A4F559B5AeF5E0338B85eBe43E3'
export const BUSD = '0x678a7d9e71Ef547D48164a0207836aa37Bbb13c0'
export const BNB = '0x7c13C3B93b6c80E5ff6D47B7ffFB7C599E9D960A'

export const oldFactory = '0xE10AA05Fcbd15Ba004683CA8109E367a5e32c27D' // new Factory
export const oldMarketPlace = '0x0267B48a3D4BcDd334541CD7D2656DF6b6fE7021' //old Ann contract
export const oldFCompared = '0xe10aa05fcbd15ba004683ca8109e367a5e32c27d' // old Factory compared
//BNB is used as WBNB here

//npx hardhat verify --network goerli 0x9b16A72bECd3F3f9354F9EA71751ABC532229a28 0x76F69BE8739b4B0D8A23c498b880614aA01bA91B

export const client = ipfsHttpClient(options);

