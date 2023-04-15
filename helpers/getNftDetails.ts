import { ethers } from "ethers";
import NftAbi from "@/config/NftAbi.json";

const getNftDetails = async (collectionAddress: string, nftId: string | number) => {
  const getName = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.AlchemyProvider(
      "goerli",
      "br-vL2X5K6ZxKDZ8N_U9sEnkIkba9Zw6"
    );
    const contract = new ethers.Contract(collectionAddress, NftAbi, provider);

    const nftOwner = await contract.ownerOf(nftId);
    resolve(nftOwner);
  });
  const owner = await getName;
  return { owner };
};

export default getNftDetails;
