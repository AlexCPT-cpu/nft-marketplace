import { ethers } from "ethers";

const blockTimestamp = async () => {
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    "br-vL2X5K6ZxKDZ8N_U9sEnkIkba9Zw6"
  );
  const currentBlock = await provider.getBlockNumber();

  const timestamp = (await provider.getBlock(currentBlock)).timestamp;
  return timestamp
};

export default blockTimestamp;
