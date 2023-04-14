import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = "2O7jwbbhhA0eiGVFyhvTVoBcmTU";
const projectSecret = "3203afb495405676d364746a0884fe98";
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

export const client = ipfsHttpClient(options);

