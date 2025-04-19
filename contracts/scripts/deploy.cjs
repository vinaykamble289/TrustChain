// scripts/deploy.cjs
async function main() {
  const hre = require("hardhat");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  const TrustChain = await hre.ethers.getContractFactory("TrustChain");
  const contract = await TrustChain.deploy();

  await contract.deployed();
  console.log("Contract deployed at:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
