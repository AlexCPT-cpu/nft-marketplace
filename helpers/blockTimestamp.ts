import { ethers } from "ethers";

const blockTimestamp = async () => {
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.ALCHEMY_ID
  );
  const currentBlock = await provider.getBlockNumber();

  const timestamp = (await provider.getBlock(currentBlock)).timestamp;
  return timestamp
};

export default blockTimestamp;
