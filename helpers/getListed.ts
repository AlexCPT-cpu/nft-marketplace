import { ethers } from "ethers";
import Marketplace from "@/config/Marketplace.json";
import { marketPlace } from "@/config/config";

const getListings = async (collectionAddress: string, from: number, size: number) => {
  const getList = new Promise(async (resolve) => {
    const provider = new ethers.providers.AlchemyProvider(
      "goerli",
      "br-vL2X5K6ZxKDZ8N_U9sEnkIkba9Zw6"
    );
    const contract = new ethers.Contract(marketPlace, Marketplace, provider);

    const list = await contract.getTokenListings(collectionAddress, from, size) 
    resolve(list);
  });
  const listings = await getList;
  return { listings };
};

export default getListings;