import { ethers } from "ethers";
import Marketplace from "@/config/Marketplace.json";
import { marketPlace } from "@/config/config";

const isListed = async (collectionAddress: string, nftId: string | number) => {
  const getData = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.AlchemyProvider(
      "goerli",
      process.env.ALCHEMY_ID
    );
    const contract = new ethers.Contract(marketPlace, Marketplace, provider);

    const listedData = await contract?.getTokenListing(collectionAddress, nftId);

    resolve(listedData);
  });
  const data = await getData;

  return { data };
};

export default isListed;
