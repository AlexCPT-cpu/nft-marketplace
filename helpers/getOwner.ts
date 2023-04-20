import { ethers } from "ethers";
import NftAbi from "@/config/NftAbi.json";

const getOwner = async (collectionAddress: string, nftId: string | number) => {
  const getName = new Promise(async (resolve) => {
    const provider = new ethers.providers.AlchemyProvider(
      "goerli",
      "br-vL2X5K6ZxKDZ8N_U9sEnkIkba9Zw6"
    );
    const contract = new ethers.Contract(collectionAddress, NftAbi, provider);

    const owner = await contract?.ownerOf(nftId);

    resolve(owner);
  });
  const data = await getName;

  return { data };
};

export default getOwner;
