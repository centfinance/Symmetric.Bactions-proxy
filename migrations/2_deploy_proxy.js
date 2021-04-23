const BActions = artifacts.require('BActions');

module.exports = async function(deployer, network, accounts) {
        deployer.deploy(BActions, '0x79378FFCbD94a5cd5819Cef1C64345d772D2A373');
}
