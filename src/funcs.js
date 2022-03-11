import Web3 from 'web3'
import PadToken from '../build/contracts/PadToken.json';
import PadTokenSale from '../build/contracts/PadTokenSale.json';
const contract = require('@truffle/contract');

export const load = async() => {
    await loadWeb3();
    const account = await loadAccount();
    const { contractPAD, contractPTS } = await loadContracts();
    const { ethFunds, transactionCount, tokensSold, ethPriceN, transactions } = await loadVariables(contractPTS);
    const bal = await contractPAD.balanceOf(account);
    const myPAD = bal / 10**18;
    return { account, contractPTS, contractPAD, ethFunds, transactionCount, tokensSold, ethPriceN, transactions, myPAD };
};


const loadVariables = async (contractPTS) => {
    const admin = "0x24AbB253275Df84f5F0f54509bbb895a9dcd53e3";
    const ethFunds = await window.web3.eth.getBalance(admin);

    const tCount = await contractPTS.transactionCount();
    const transactionCount = tCount.toNumber();

    const tSold = await contractPTS.tokensSold();
    const tokensSold = window.web3.utils.fromWei(tSold, 'ether');

    const ethPrice = await contractPTS.getETHPrice();
    const ethPriceN = ethPrice.toNumber();

    // Make this strange for loop to get the last 10 transactions.
    const transactions = [];
    var h = 0;
    for (var i = transactionCount - 1; i >= 0 && h < 10; i--) {
        const t = await contractPTS.transaction(i);
        h++;
        transactions.push(t);
    }

    return { ethFunds, transactionCount, tokensSold, ethPriceN, transactions };
};

const loadContracts = async () => {
    const PADContract = contract(PadToken);
    PADContract.setProvider(window.web3.currentProvider);
    const PTSContract = contract(PadTokenSale);
    PTSContract.setProvider(window.web3.currentProvider);

    const contractPAD = await PADContract.deployed();
    const contractPTS = await PTSContract.deployed();

    return { contractPAD, contractPTS };
};

const loadAccount = async () => {
    const account = window.web3.eth.getCoinbase();
    return account;
};

const loadWeb3 = async() => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            Web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(Web3.currentProvider);
        // Acccounts always exposed
        Web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};