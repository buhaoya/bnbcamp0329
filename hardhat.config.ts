import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "hardhat-deploy";

import "./tasks";
import "./tasks/functionSignature";
import "./tasks/storageStructure";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      localhost: 0,
    },
  },
  // Default network when you don't specify "--network {network_name}"
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
      accounts : [
        process.env.ACCOUNT1_PRIVATE_KEY as string,
        process.env.ACCOUNT2_PRIVATE_KEY as string,
        process.env.ACCOUNT3_PRIVATE_KEY as string
      ].filter(Boolean)
    },
    goerli: {
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_KEY,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      // {
      //  mnemonic: process.env.MNEMONIC,
      //  count: 20,
      //}
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts : [
        process.env.ACCOUNT1_PRIVATE_KEY as string,
        process.env.ACCOUNT2_PRIVATE_KEY as string,
        process.env.ACCOUNT3_PRIVATE_KEY as string
      ].filter(Boolean)
    },
    // "https://api-testnet.bscscan.com/"
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: process.env.bscscanApiKey 
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};

export default config;
