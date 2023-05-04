require ("dotenv/config");
require('dotenv-defaults').config()

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");


module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat:{},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.SEPOLIA_MY_METAMASK_PRIVATE_KEY]
    },
    infura: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.SEPOLIA_MY_METAMASK_PRIVATE_KEY]
    },
    polygon_mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_API_KEY}`,
      accounts: [process.env.MUMBAI_MY_METAMASK_PRIVATE_KEY]
      }    
  },
  etherscan: {
    // see argument.js for constructor
    //https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan
    // npx hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
    url: `https://etherscan.io`,
    // apiKey: ETHERSCAN_API_KEY
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  }
};
