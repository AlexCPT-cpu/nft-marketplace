import { ethers } from "ethers";
import NftAbi from "@/config/NftAbi.json";

const getCollectionName = async (collectionAddress: string) => {
  const getName = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.AlchemyProvider(
      "goerli",
      process.env.ALCHEMY_ID
    );
    const contract = new ethers.Contract(collectionAddress, NftAbi, provider);

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
