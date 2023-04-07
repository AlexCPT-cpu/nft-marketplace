import { ethers } from "ethers";
import NftAbi from "@/config/NftAbi.json";

const getCollectionName = async (collectionAddress: string) => {
  const getName = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.AlchemyProvider(
      "goerli",
      "br-vL2X5K6ZxKDZ8N_U9sEnkIkba9Zw6"
    );
    const contract = new ethers.Contract(collectionAddress, NftAbi, provider);

    const collectionName = await contract.name();
    resolve(collectionName);
  });
  const name = await getName;
  return { name };
};

export default getCollectionName;
