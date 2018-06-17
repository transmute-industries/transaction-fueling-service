const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URL));
const ManagedTokenABI = require('./ManagedTokenABI.js');
const Tx = require('ethereumjs-tx');
const managedToken = new web3.eth.Contract(ManagedTokenABI);

managedToken.options.address = process.env.REACT_APP_CONTRACT_ADDRESS;

async function getSymbol(){
  const data = await managedToken.methods.symbol().call();
  return data;
}

async function getTotalSupply(){
  const data = await managedToken.methods.totalSupply().call();
  return data;
}

async function getBalance(userAddress){
  const data = await managedToken.methods.balanceOf(userAddress).call();
  return data;
}

async function makeNewAccount(){
  const newAccount = await web3.eth.accounts.create();
  return newAccount;
}

async function makeKeystore(privateKey,password){
  const keystore = web3.eth.accounts.encrypt(privateKey,password);
  return keystore;
}

async function decryptAccount(keystore,password){
  const account = web3.eth.accounts.decrypt(keystore,password);
  return account;
}

async function sendTransaction(rawTx,privateKey){
  var tx = new Tx(rawTx);
  var shortPrivateKey = privateKey.slice(2);
  const privateKeyHex = new Buffer(shortPrivateKey, 'hex');
  tx.sign(privateKeyHex);
  const serializedTx = tx.serialize().toString('hex');
  const txHash = await web3.eth.sendSignedTransaction('0x'+serializedTx);
  return txHash;
}

async function burn(from,value,privateKey){
  const txCount = await web3.eth.getTransactionCount(from);
  var data = managedToken.methods.burn(value).encodeABI();
  var rawTx ={
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(100000),
    gasPrice: web3.utils.toHex(10e9),
    to: managedToken.options.address,
    from: from,
    data: data
  }
  const txHash = await sendTransaction(rawTx,privateKey);
  return txHash;
}

async function transfer(from,to,value,privateKey){
  const txCount = await web3.eth.getTransactionCount(from);
  var data = managedToken.methods.transfer(to,value).encodeABI();
  var rawTx ={
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(100000),
    gasPrice: web3.utils.toHex(10e9),
    to: managedToken.options.address,
    from: from,
    data: data
  }
  const txHash = await sendTransaction(rawTx,privateKey);
  return txHash;
}

export {getSymbol,getTotalSupply,getBalance,makeNewAccount,makeKeystore,
  decryptAccount,burn,transfer}
