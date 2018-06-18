'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var axios = _interopDefault(require('axios'));
var path = _interopDefault(require('path'));
var cors = _interopDefault(require('cors'));
var bodyParser = _interopDefault(require('body-parser'));
var eaa = _interopDefault(require('express-async-await'));
var dotenv = _interopDefault(require('dotenv'));

var ManagedTokenABI = [{
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_spender",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_from",
    "type": "address"
  }, {
    "name": "_to",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "withdraw",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_to",
    "type": "address"
  }, {
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "mint",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "burn",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_to",
    "type": "address"
  }],
  "name": "delegate",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "paused",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }],
  "name": "delegateOf",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "newAdmin",
    "type": "address"
  }],
  "name": "changeAdmin",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "symbol",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "newOwner",
    "type": "address"
  }],
  "name": "changeOwner",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_to",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "transfer",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_from",
    "type": "address"
  }, {
    "name": "_to",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "managedTransfer",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "togglePause",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }, {
    "name": "_spender",
    "type": "address"
  }],
  "name": "allowance",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "admin",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "name": "_name",
    "type": "string"
  }, {
    "name": "_symbol",
    "type": "string"
  }, {
    "name": "_supply",
    "type": "uint256"
  }, {
    "name": "_admin",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "from",
    "type": "address"
  }, {
    "indexed": true,
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Transfer",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "owner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "spender",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Approval",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "_to",
    "type": "address"
  }, {
    "indexed": false,
    "name": "amount",
    "type": "uint256"
  }],
  "name": "Mint",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "_from",
    "type": "address"
  }, {
    "indexed": false,
    "name": "amount",
    "type": "uint256"
  }],
  "name": "Burn",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "from",
    "type": "address"
  }, {
    "indexed": true,
    "name": "to",
    "type": "address"
  }],
  "name": "Delegation",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "from",
    "type": "address"
  }, {
    "indexed": true,
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "ManagedTransfer",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [],
  "name": "TogglePause",
  "type": "event"
}];

var Web3 = require('web3');

var Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/".concat(process.env.INFURA_API_KEY)));
var ManagedToken = new web3.eth.Contract(ManagedTokenABI);
var createEthTx = function createEthTx(from, to, value) {
  return new Promise(function ($return, $error) {
    var txCount, valueWei, rawTx;
    return Promise.resolve(web3.eth.getTransactionCount(from)).then(function ($await_5) {
      try {
        txCount = $await_5;
        valueWei = web3.utils.toWei(value);
        rawTx = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(50000),
          gasPrice: web3.utils.toHex(10e9),
          to: to,
          from: from,
          value: web3.utils.toHex(valueWei)
        };
        return $return(rawTx);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
};
var createTransferTx = function createTransferTx(from, to, value, contractAddress) {
  return new Promise(function ($return, $error) {
    var txCount, data, rawTx;
    ManagedToken.options.address = process.env.TOKEN_CONTRACT_ADDRESS;
    return Promise.resolve(web3.eth.getTransactionCount(from)).then(function ($await_6) {
      try {
        txCount = $await_6;
        data = ManagedToken.methods.transfer(to, value).encodeABI();
        rawTx = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(90000),
          gasPrice: web3.utils.toHex(10e9),
          to: contractAddress,
          from: from,
          data: data
        };
        return $return(rawTx);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
};
var sendTransaction = function sendTransaction(rawTx, privateKey) {
  return new Promise(function ($return, $error) {
    var tx, shortPrivateKey, privateKeyHex, serializedTx, txHash;
    tx = new Tx(rawTx);
    shortPrivateKey = privateKey.slice(2);
    privateKeyHex = new Buffer(shortPrivateKey, 'hex');
    tx.sign(privateKeyHex);
    serializedTx = tx.serialize().toString('hex');
    return Promise.resolve(web3.eth.sendSignedTransaction("0x".concat(serializedTx))).then(function ($await_10) {
      try {
        txHash = $await_10;
        return $return(txHash);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
};

var router = express.Router();
var instance = axios.create({
  baseURL: process.env.OKTA_BASE_URL,
  headers: {
    Authorization: "SSWS ".concat(process.env.OKTA_API_TOKEN)
  }
});
router.post('/users', function (req, res) {
  return new Promise(function ($return, $error) {
    var _response;

    if (req.body.profile) {
      console.log('req.body: ', req.body);
      return Promise.resolve(instance.post('/api/v1/users?activate=true', Object.assign({}, req.body))).then(function ($await_3) {
        try {
          _response = $await_3;

          try {
            // TODO: Send pending transaction hash(es)
            createEthTx(process.env.TOKEN_OWNER_ADDRESS, req.body.profile.ethAddress, '0.05').then(function (rawTx) {
              sendTransaction(rawTx, process.env.TOKEN_OWNER_SK);
            });
            createTransferTx(process.env.TOKEN_OWNER_ADDRESS, req.body.profile.ethAddress, 100, process.env.TOKEN_CONTRACT_ADDRESS).then(function (rawTx) {
              sendTransaction(rawTx, process.env.TOKEN_OWNER_SK);
            });
            res.json(Object.assign({}, _response.data));
          } catch (err) {
            console.log(err);
            res.status(500).send({
              data: 'Error transfering ETH and TST'
            });
          }

          return $If_2.call(this);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    } else {
      console.log("response: ", response);
      res.status(400).send({
        error: 'Invalid payload, please include profile in the body of the payload.'
      });
      return $If_2.call(this);
    }

    function $If_2() {
      return $return();
    }
  });
});
router.get('/users/:ethereum_address/fuel', function (req, res) {
  return new Promise(function ($return, $error) {
    // TODO: Send pending transaction hash(es)
    // TODO: Only sending ETH here
    createEthTx(process.env.TOKEN_OWNER_ADDRESS, req.params.user_id, '0.05');
    sendTransaction(rawTx, process.env.TOKEN_OWNER_SK);
    res.status(202);
    return $return();
  });
});

if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: '../.env'
  });
}

var app = express();
eaa(app);
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/api/v0', router);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Listening on ".concat(PORT));
});

module.exports = app;
