require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-ethers")
require("dotenv").config();
require("hardhat-deploy");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eht-sepolia/example"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const EHTERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"

module.exports = {
  defaultNetwork:"hardhat",
  
  solidity: "0.8.19",

  networks:{
    sepolia:{
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId:11155111,
      blockConfirmations: 6
    },
    localhost:{
      url:"http://127.0.0.1:8545/",
      chainId: 31337,
    }
  },
  etherscan:{
    apiKey: EHTERSCAN_API_KEY,
  },
  namedAccounts:{
    deployer: {
      default : 0,
    },
  },

};
