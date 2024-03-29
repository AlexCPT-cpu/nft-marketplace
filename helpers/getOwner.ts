import { ethers } from "ethers";
import NftAbi from "@/config/NftAbi.json";

const getOwner = async (collectionAddress: string, nftId: string | number) => {
  const getName = new Promise(async (resolve) => {
    const provider = new ethers.providers.InfuraProvider(
      "goerli",
      process.env.INFURA_KEY
    );
    const contract = new ethers.Contract(collectionAddress, NftAbi, provider);

    const owner = await contract?.ownerOf(nftId);

    resolve(owner);
  });
  const data = await getName;

  return { data };
};

export default getOwner;
