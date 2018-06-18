import express from 'express';
import axios from 'axios';

import * as wallet from '../../utils/wallet';

const router = express.Router();

const instance = axios.create({
  baseURL: process.env.OKTA_BASE_URL,
  headers: { Authorization: `SSWS ${process.env.OKTA_API_TOKEN}` }
});

router.post('/users', async (req, res) => {
  if (req.body.profile) {
    console.log('req.body: ', req.body);
    let response = await instance.post('/api/v1/users?activate=true', {
      ...req.body
    });

    try {
      // TODO: Send pending transaction hash(es)
      wallet.createEthTx(process.env.TOKEN_OWNER_ADDRESS, req.body.profile.ethAddress, '0.05').then(rawTx => {
        wallet.sendTransaction(rawTx, process.env.TOKEN_OWNER_SK);
      });

      wallet.createTransferTx(process.env.TOKEN_OWNER_ADDRESS, req.body.profile.ethAddress, 100, process.env.TOKEN_CONTRACT_ADDRESS).then(rawTx => {
        wallet.sendTransaction(rawTx, process.env.TOKEN_OWNER_SK);
      });

      res.json({ ...response.data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ data: 'Error transfering ETH and TST' });
    }
  } else {
    console.log("response: ", response);
    res.status(400).send({
      error: 'Invalid payload, please include profile in the body of the payload.'
    });
  }
});

router.get('/users/:ethereum_address/fuel', async (req, res) => {
  // TODO: Send pending transaction hash(es)
  // TODO: Only sending ETH here
  wallet.createEthTx(process.env.TOKEN_OWNER_ADDRESS, req.params.user_id, '0.05');
  wallet.sendTransaction(rawTx, process.env.TOKEN_OWNER_SK);
  res.status(202);
});

export default router;