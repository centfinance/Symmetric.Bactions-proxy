const RightsManager = artifacts.require('RightsManager');
const SmartPoolManager = artifacts.require('SmartPoolManager');
const CRPFactory = artifacts.require('CRPFactory');
const BalancerSafeMath = artifacts.require('BalancerSafeMath');
const BActions = artifacts.require('BActions');
const BFactory = artifacts.require('BFactory');

module.exports = async function(deployer, network, accounts) {
    if (network == 'development' || network == 'soliditycoverage') {
        await deployer.deploy(RightsManager);
        await deployer.deploy(SmartPoolManager);
        await deployer.deploy(BFactory);
        await deployer.deploy(BalancerSafeMath);

        await deployer.link(BalancerSafeMath, CRPFactory);
        await deployer.link(RightsManager, CRPFactory);
        await deployer.link(SmartPoolManager, CRPFactory);

        await deployer.deploy(CRPFactory);

        await deployer.deploy(BActions, BFactory.address);
    } else if (network == 'kovan-fork' || network == 'kovan') {
        deployer.deploy(BActions, '0xf5fc5042d8424619BB318bAeDd0f0F1A591f2a3A');
    } else if (network == 'sokol') {
        deployer.deploy(BActions, '0x3B4261a0A617a01ff7994bD15896ab1d384baABF');
    } else if (network == 'xdai') {
        deployer.deploy(BActions, '0xD21B8c3F9F3b2487F65e199fB1ea1753412d16A8');
    } else if (network == 'alfajores') {
        deployer.deploy(BActions, '0x07Fa70d4560663E64b44a217AD40a926Dc5BdA5c');
    } else if (network == 'celo') {
        deployer.deploy(BActions, '0x6C2e59C3cCB1d81c0eC9Fb9d4d6a3CC3488Fd71c');
    }
}
