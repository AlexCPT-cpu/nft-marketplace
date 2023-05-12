import { ethers } from "ethers";

const blockTimestamp = async () => {
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_KEY
  );
  const currentBlock = await provider.getBlockNumber();

  const timestamp = (await provider.getBlock(currentBlock)).timestamp;
  return timestamp
};

export default blockTimestamp;
