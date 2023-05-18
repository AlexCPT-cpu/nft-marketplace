import { ethers } from "ethers";
import NftAbi from "@/config/NftAbi.json";
import { factory } from "@/config/config";

const getCollectionName = async (collectionAddress: string, tokenId: string | number) => {
  const getName = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.InfuraProvider(
      "goerli",
      process.env.INFURA_KEY
    );
    const contract = new ethers.Contract(collectionAddress ?? factory, NftAbi, provider);

    const imageURL = await contract?.tokenURI(tokenId);
    resolve(imageURL);
  });
  const data = await getName;

  return { data };
};

export default getCollectionName;
