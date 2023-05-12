import { ethers } from "ethers";
import Marketplace from "@/config/Marketplace.json";
import { marketPlace } from "@/config/config";

const getListings = async (collectionAddress: string, from: number, size: number) => {
  const getList = new Promise(async (resolve) => {
    const provider = new ethers.providers.InfuraProvider(
      "goerli",
      process.env.INFURA_KEY
    );
    const contract = new ethers.Contract(marketPlace, Marketplace, provider);

    const list = await contract.getTokenListings(collectionAddress, from, size) 
    resolve(list);
  });
  const listings = await getList;
  return { listings };
};

export default getListings;