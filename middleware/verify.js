  const jwt = require('jsonwebtoken')


  const verify = (req , res , next)=>{
   const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = verify;
