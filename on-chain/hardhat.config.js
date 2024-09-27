require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    ropsten: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/3ZSGrvGv80auqD3K4T2v1peYZG3rIg1D',
      accounts: ['bef34f89f3b1b06c3bc2db9ec75c1acc98001739e1b06f65cf1655899b68bca4'],

    },
  },
};
//sepolia