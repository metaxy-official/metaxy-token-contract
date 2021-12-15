import { task } from "hardhat/config";
import * as dotenv from "dotenv";
require("@nomiclabs/hardhat-ethers");

dotenv.config();

const TOKEN_TOTAL_SUPPLY = process.env.TOKEN_TOTAL_SUPPLY || "0";

/**
 * npx hardhat deploy_testnet --network bsc_testnet
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
