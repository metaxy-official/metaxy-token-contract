require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
import { task } from "hardhat/config";
import * as dotenv from "dotenv";
dotenv.config();

const TOKEN_TOTAL_SUPPLY = process.env.TOKEN_TOTAL_SUPPLY || "0";
const TOKEN_DEPLOYED_CONTRACT_ADDRESS = process.env.TOKEN_DEPLOYED_CONTRACT_ADDRESS || "0";
const DEPLOYER_WALLET_ADDRESS = process.env.DEPLOYER_WALLET_ADDRESS || "0";

/**
 * npx hardhat deploy_testnet --network bsc_testnet
 * npx hardhat verify_testnet --network bsc_testnet
 */
task("deploy_testnet", "deploys TestNet", async (_, { ethers }) => {
  const [deployer] = await ethers.getSigners();
  console.log("[MXY] owner is", deployer.address);
  console.log("[MXY] total supply is", TOKEN_TOTAL_SUPPLY);

  const MxyToken = await ethers.getContractFactory("MxyToken");
  const instance = await MxyToken.deploy(deployer.address, TOKEN_TOTAL_SUPPLY);  
  await instance.deployed();
  console.log("[MXY] deployed to:", instance.address);
});

task("verify_testnet", "Verify TestNet", async (_, hre) => {
  console.log("[MXY] owner is", DEPLOYER_WALLET_ADDRESS);
  console.log("[MXY] contract address is", TOKEN_DEPLOYED_CONTRACT_ADDRESS);

  await hre.run('verify:verify', {
    address: TOKEN_DEPLOYED_CONTRACT_ADDRESS,
    contract: "contracts/token/MxyToken.sol:MxyToken",
    constructorArguments: [DEPLOYER_WALLET_ADDRESS, TOKEN_TOTAL_SUPPLY]
  });

  console.log("[MXY] successfully verification");
});