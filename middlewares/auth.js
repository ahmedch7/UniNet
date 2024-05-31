import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  console.log("header.auth=",req.header('Authorization'));
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log("token is :",token);
  console.log("JWT_SECRET is :",process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded is =",decoded);
    const user = await User.findOne({ _id: decoded._id});

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default auth;
