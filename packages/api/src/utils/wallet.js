const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/${process.env.INFURA_API_KEY}`));

import ManagedTokenABI from '../resources/ManagedTokenABI.js';
const ManagedToken = new web3.eth.Contract(ManagedTokenABI);

export const createAccount = () => {
  const newAccount = web3.eth.accounts.create();
  return newAccount;
}

export const readOperation = async (address, methodName) => {
  ManagedToken.options.address = address;
  const data = await ManagedToken.methods[methodName]().call();
  return data;
}

export const accountRead = async (address, methodName, account) => {
  ManagedToken.options.address = address;
  const data = await ManagedToken.methods[methodName](account).call();
  return data;
}

export const getEthBalance = async (address) => {``
  const weiBalance = await web3.eth.getBalance(address);
  const ethBalance = await web3.utils.fromWei(weiBalance);
  return ethBalance;
}

export const createEthTx = async (from, to, value) => {
  const txCount = await web3.eth.getTransactionCount(from);
  const valueWei = web3.utils.toWei(value);
  let rawTx = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(50000),
    gasPrice: web3.utils.toHex(10e9),
    to: to,
    from: from,
    value: web3.utils.toHex(valueWei)
  }
  return rawTx;
}

export const createTransferTx = async (from, to, value, contractAddress) => {
  ManagedToken.options.address = process.env.TOKEN_CONTRACT_ADDRESS;
  const txCount = await web3.eth.getTransactionCount(from);
  let data = ManagedToken.methods.transfer(to, value).encodeABI();
  let rawTx = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(90000),
    gasPrice: web3.utils.toHex(10e9),
    to: contractAddress,
    from: from,
    data: data
  }
  return rawTx;
}

export const createMintTx = async (from, to, value, contractAddress) => {
  ManagedToken.options.address = process.env.TOKEN_CONTRACT_ADDRESS;
  const txCount = await web3.eth.getTransactionCount(from);
  let data = ManagedToken.methods.mint(to, value).encodeABI();
  let rawTx = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(90000),
    gasPrice: web3.utils.toHex(10e9),
    to: contractAddress,
    from: from,
    data: data
  }
  return rawTx;
}

export const createBurnTx = async (from, value, contractAddress) => {
  ManagedToken.options.address = process.env.TOKEN_CONTRACT_ADDRESS;
  const txCount = await web3.eth.getTransactionCount(from);
  let data = ManagedToken.methods.burn(value).encodeABI();
  let rawTx = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(90000),
    gasPrice: web3.utils.toHex(10e9),
    to: contractAddress,
    from: from,
    data: data
  }
  return rawTx;
}

export const createWithdrawalTx = async (from) => {
  ManagedToken.options.address = process.env.TOKEN_CONTRACT_ADDRESS;
  const txCount = await web3.eth.getTransactionCount(from);
  let data = ManagedToken.methods.withdraw().encodeABI();
  let rawTx = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(90000),
    gasPrice: web3.utils.toHex(10e9),
    to: contractAddress,
    from: from,
    data: data
  }
  return rawTx;
}

export const sendTransaction = async (rawTx, privateKey) => {
  let tx = new Tx(rawTx);
  let shortPrivateKey = privateKey.slice(2);
  const privateKeyHex = new Buffer(shortPrivateKey, 'hex');
  tx.sign(privateKeyHex);
  const serializedTx = tx.serialize().toString('hex');
  const txHash = await web3.eth.sendSignedTransaction(`0x${serializedTx}`);
  return txHash;
}
