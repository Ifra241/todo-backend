const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
  
//Signup route
router.post('/signup',async(req ,res)=>{

    try{
        const{ name,email,password } = req.body;

      const exisitingUser = await User.findOne({email});
      if(exisitingUser)  {
        return res.status(400).json({message: 'User already exist'});
      }
      const hashedPassword = await bcrypt.hash(password,10);

      const user =new User({
        name,
        email,
        password:hashedPassword,
      });
      await user.save();
      res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});
// Login Route

router .post('/login',async(req,res)=>{
     try{
        const{ email , password}= req.body;
         const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
}
const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch){
    return res.status(400).json({message: 'Invalid email or password'});
}
    // Create JWT token
 const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: '24h',
});
 

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  
    }
})
module.exports = router;
