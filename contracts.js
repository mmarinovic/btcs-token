var secrets = require('./secrets.json');

module.exports = {
  default: {
    deployment: {
      host: "localhost",
      port: 8545,
      type: "rpc",
      accounts: [
        {
          mnemonic: secrets.mnemonic_local,
          addressIndex: "0"
        }
      ]
    },
    gas: "auto",
    contracts: {
      BtcsToken: {
        args: {
          _totalSupply: 1000
        }
      }
    }
  },
  testnet: {
    deployment: {
      host: "rinkeby.infura.io/ZKxA2TsccPJIoWO5h7EO",
      port: false,
      protocol: 'https',
      type: "rpc",
      accounts: [
        {
          mnemonic: secrets.mnemonic_live,
          addressIndex: "0"
        }
      ]
    }
  },
  livenet: {
    deployment: {
      host: "mainnet.infura.io/ZKxA2TsccPJIoWO5h7EO",
      port: false,
      protocol: 'https',
      type: "rpc",
      accounts: [
        {
          mnemonic: secrets.mnemonic_live,
          addressIndex: "0"
        }
      ]
    }
  }
};
