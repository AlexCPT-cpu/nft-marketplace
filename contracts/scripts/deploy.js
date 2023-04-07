// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("OriginCreate");
  const MarketPlace = await hre.ethers.getContractFactory("OriginMarketplace");

  const marketPlace = await MarketPlace.deploy(
    "8000",
    "0xd05DB5264ECAB3C490f7Cc106104Ffe1075d3EeC",
  );
  await marketPlace.deployed();

  const factory = await Factory.deploy(marketPlace.address);
  await factory.deployed();

  console.log(` Factory Deployed to ${marketPlace.address}`);

  console.log(` MarketPlace Deployed to ${factory.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/*
 Factory Deployed to 0x122eadba42fdA628654a1Aa09adC4664b6ef2110
 MarketPlace Deployed to 0x10A20bE71a7161cf81d2511e987fa91225865a32
*/