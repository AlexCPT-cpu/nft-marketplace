import { ethers } from "ethers";
import Marketplace from "@/config/Marketplace.json";
import { marketPlace } from "@/config/config";

const getBids = async (collectionAddress: string, address: string) => {
  const getList = new Promise(async (resolve) => {
    const provider = new ethers.providers.InfuraProvider(
      "goerli",
      process.env.INFURA_KEY
    );
    const contract = new ethers.Contract(marketPlace, Marketplace, provider);
    const size = await contract.numTokenWithBids(collectionAddress)

    const list = await contract.getBidderBids(collectionAddress, address, 0, parseInt(size._hex)+2) 
    resolve(list);
  });
  const bids = await getList;
  return { bids };
};

export default getBids;