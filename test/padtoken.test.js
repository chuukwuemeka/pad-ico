const PadToken = artifacts.require('PadToken');
const PadTokenSale = artifacts.require('PadTokenSale');

contract('PadToken', () => {
    const initAmount = BigInt(750000000 * 10**18);
    it('The contract was initialized with the appropriate values', () => {
        PadToken.deployed().then((PAD) => {
            PadTokenSale.deployed().then((PTS) => {
                PAD.transfer(PTS.address, initAmount)
            });
        })
    });
});