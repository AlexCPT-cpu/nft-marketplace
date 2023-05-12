import { ethers } from "ethers";
import NftAbi from "@/config/NftAbi.json";
import { factory } from "@/config/config";

const getCollectionName = async (collectionAddress: string) => {
  const getName = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.InfuraProvider(
      "goerli",
      process.env.INFURA_KEY
    );
    const contract = new ethers.Contract(collectionAddress ?? factory, NftAbi, provider);

    const collectionName = await contract?.name();
    const creator = await contract.owner();
    const obj: {
      collectionName: string;
      creator: string;
    } = { collectionName, creator };
    resolve(obj);
  });
  const data = await getName;

  return { data };
};

export default getCollectionName;
