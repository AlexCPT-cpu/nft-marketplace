// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("OriginCreate");
  const MarketPlace = await hre.ethers.getContractFactory(
    "OriginMarketplaceV2"
  );

  const marketPlace = await MarketPlace.deploy(
    "0x7c13C3B93b6c80E5ff6D47B7ffFB7C599E9D960A"
  );
  await marketPlace.deployed();

  const factory = await Factory.deploy(marketPlace.address);
  await factory.deployed();

  console.log(` Factory Deployed to ${factory.address}`);

  console.log(` MarketPlace Deployed to ${marketPlace.address}`);

  // await hre.run(`verify:verify`, {
  //   address: marketPlace.address,
  //   constructorArguments: [
  //     "8000",
  //     "0xd05DB5264ECAB3C490f7Cc106104Ffe1075d3EeC",
  //   ],
  // });

  // await hre.run(`verify:verify`, {
  //   address: factory.address,
  //   constructorArguments: [marketPlace.address],
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/*
 Factory Deployed to 0x76F69BE8739b4B0D8A23c498b880614aA01bA91B
 MarketPlace Deployed to 0x9b16A72bECd3F3f9354F9EA71751ABC532229a28
 npx hardhat verify --network goerli 0x9b16A72bECd3F3f9354F9EA71751ABC532229a28 "0x7c13C3B93b6c80E5ff6D47B7ffFB7C599E9D960A"
 npx hardhat run scripts/deploy.js --network goerli
*/
