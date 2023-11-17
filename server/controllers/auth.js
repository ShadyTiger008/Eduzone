const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const register = async (req, res) => {
   try {
     const {
      fullName,
      userName,
      friends,
      email,
      password,
      picturePath,
      location,
      occupation,
      viewedProfile,
      impressions
      } = req.body;

     if (!password) {
       return res.status(400).json({ error: "Password is required." });
     }
       
     const salt = await bcrpyt.genSalt();
     const passwordHash = await bcrpyt.hash(password, salt);

     const newUser = new User({
      fullName,
      userName,
      friends,
      email,
      password: passwordHash,
      picturePath,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
     });

     const savedUser = await newUser.save();
     res.status(201).json(savedUser);
   } catch (error) {
       res.status(500).json({
        message: error
    });
   }
}

const login = async (req, res) => {
   try {
     const { email, password } = req.body;
     const user = await User.findOne({ email: email });
     
     if (!user) {
         return res.status(404).json({
             message: "User does not exist!"
         });
     }
    
     const isMatch = await bcrpyt.compare(password, user.password);
     if (!isMatch) {
         return res.status(404).json({
             message: "Password is incorrect!"
         });
     }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     delete user.password;
     return res.status(200).json({
         token,
         user
     });
   } catch (error) {
      return res.status(500).json({
      error: error.message
    });
  }
}

module.exports = { register, login };