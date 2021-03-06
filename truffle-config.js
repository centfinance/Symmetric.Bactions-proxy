/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 require('dotenv').config();
 const HDWalletProvider = require('@truffle/hdwallet-provider');
 const ContractKit = require('@celo/contractkit')
 
 const Web3 = require('web3');
 const web3_alfajores = new Web3(process.env.ALFAJORES_REST_URL);
 const web3_celo = new Web3(process.env.CELO_REST_URL);
 const web3 = new Web3();
 
 const mnemonicPhrase = process.env.MNEMONIC;
 const privateKey = process.env.PRIVATEKEY;
 const kit = ContractKit.newKitFromWeb3(web3_alfajores) // Change to Celo web3 for main net deployment
 const account = web3_alfajores.eth.accounts.privateKeyToAccount(privateKey)
 kit.connection.addAccount(account.privateKey);

module.exports = {
    /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

    networks: {
        development: {
            host: '0.0.0.0', // Localhost (default: none)
            port: 8545, // Standard Ethereum port (default: none)
            network_id: '*', // Any network (default: none)
            gas: 10000000,
        },
        coverage: {
            host: '0.0.0.0',
            network_id: '*',
            port: 8545,
            gas: 0xfffffffffff,
            gasPrice: 0x01,
        },
        homestead: {
          provider: () =>
            new HDWalletProvider({
              mnemonic: {
                phrase: mnemonicPhrase
              },
              providerOrUrl: web3,
    //          numberOfAddresses: 1,
    //          shareNonce: true,
    //          derivationPath: "m/44'/1'/0'/0/"
              derivationPath: "m/44'/60'/0'/0/"
            }),
          gas: 10000000,
          gasPrice: web3.utils.toWei('46', 'gwei'),
          network_id: 1,
      },
      kovan: {
          provider: () =>
            new HDWalletProvider({
              mnemonic: {
                phrase: mnemonicPhrase
              },
              providerOrUrl: ``,
            }),
            gas: 10000000,
            gasPrice: web3.utils.toWei('46', 'gwei'),
            network_id: 42,
      },
      sokol: {
          provider: () =>
            new HDWalletProvider({
              mnemonic: {
                phrase: mnemonicPhrase
              },
              providerOrUrl: ``,
            }),
            gas: 10000000,
            gasPrice: 5000000000,
            network_id: 77,
      },
      xdai: {
        provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase
          },
          providerOrUrl: "https://dai.poa.network",
        }),
        gas: 5000000,
        gasPrice: 10000000000,
      network_id: 100,
      networkCheckTimeout: 1000000000,
      confirmations: 5,
      timeoutBlocks: 900
    },
    catalyst: {
        provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase
          },
          providerOrUrl: web3,
        }),
      gas: 12087782,
      gasPrice: 1000000000,
      network_id: 10000,
    },
    alfajores: {
      provider: kit.connection.web3.currentProvider, // CeloProvider
      network_id: 44787                              // Alfajores Celo test netowrk network id
    },
    celo: {
      provider: kit.connection.web3.currentProvider, // CeloProvider
      network_id: 42220                              // Alfajores Celo test netowrk network id
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
  // timeout: 100000
  },

  // Configure your compilers
  compilers: {
      solc: {
          version: '0.6.12',
          // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
          settings: { // See the solidity docs for advice about optimization and evmVersion
              optimizer: {
                  enabled: true,
                  runs: 100,
              },
              evmVersion: 'istanbul',
          },
      },
  },
};
