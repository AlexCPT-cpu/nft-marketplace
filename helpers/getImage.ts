import { ethers } from "ethers";
import NftAbi from "@/config/NftAbi.json";
import { factory } from "@/config/config";
import fetch from "./fetch";

const getImage = async (collectionAddress: string, tokenId: string | number) => {
  const getName = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.InfuraProvider(
      "goerli",
      process.env.INFURA_KEY
    );
    const contract = new ethers.Contract(collectionAddress ?? factory, NftAbi, provider);

    const imageURL = await contract?.tokenURI(tokenId);
    const route = imageURL?.replace('ipfs://', 'https://ipfs.io/ipfs/')
    const  { data } = await fetch('GET', route)
    resolve(data?.image);
  });
  const data = await getName;

  return { data };
};

export default getImage;
