require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split (','),
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      network_id: 42,       
      gas: 5500000,        
      confirmations: 2,    
      timeoutBlocks: 200,  
      skipDryRun: true     
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    
      settings: {          
        optimizer: {
          enabled: false,
          runs: 200
        },
      }
    }
  },
};

