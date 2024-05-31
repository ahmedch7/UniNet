// middlewares/checkTokenBlacklist.js

import jwt from 'jsonwebtoken';
import { blacklistedTokens } from '../utils/blackList.js';

const checkTokenBlacklist = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (blacklistedTokens.has(token)) {
    return res.status(401).send({ error: 'Token has been revoked.' });
  }
  next();
};

export default checkTokenBlacklist;
