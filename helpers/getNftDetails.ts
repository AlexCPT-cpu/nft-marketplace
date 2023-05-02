import { ethers } from "ethers";
import NftAbi from "@/config/NftAbi.json";

const getNftDetails = async (collectionAddress: string, nftId: string | number) => {
  const getName = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.AlchemyProvider(
      "goerli",
      process.env.ALCHEMY_ID
    );
    const contract = new ethers.Contract(collectionAddress, NftAbi, provider);

    const nftOwner = await contract.ownerOf(nftId);
    resolve(nftOwner);
  });
  const owner = await getName;
  return { owner };
};

export default getNftDetails;
