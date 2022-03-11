const PadToken = artifacts.require("./padTokenICO/PadToken");
const PadTokenSale = artifacts.require("./padTokenICO/PadTokenSale");

module.exports = async function(deployer) {
    const accounts = await web3.eth.getAccounts()
    await deployer.deploy(PadToken);

    const feeAccount = accounts[0]

    await deployer.deploy(PadTokenSale, feeAccount)
    
};