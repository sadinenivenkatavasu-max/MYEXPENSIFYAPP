const User = require('../models/user-model');
const bcryptjs = require('bcryptjs');
const jwt =require('jsonwebtoken')
const {userRegisterValidationSchema, userLoginValidationSchema} = require('../validations/user-validation');

const userCltr = {};

userCltr.register = async (req, res) => {
  const body = req.body;
  const { error, value } = userRegisterValidationSchema.validate(body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ error: error.details });
  }

  try {
    const userByEmail = await User.findOne({ email: value.email });
    if (userByEmail) {
      return res.status(400).json({ error: 'Email already taken' });
    }

    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(value.password, salt);
    value.password = hash;

    const newUser = new User(value);
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

userCltr.login = async(req,res) => {
  const body = req.body;
  const{error, value} = userLoginValidationSchema.validate(body,{abortEarly:false});
  if(error){
    return res.status(400).json({ error: error.details});
  }
  const user = await User.findOne({ email: value.email });

  //handle error
  if(!user){
    return res.status(401).json({ error: 'invalid email /password'});
  }

  const passwordMatch = await bcryptjs.compare(value.password,user.password);
  if(!passwordMatch){
    return res.status(401).json({error: 'invalid email /password'});
  }
  //generate a jwt
  // await user.findByIdAndUpdate(user._id,{ $sinc: {loginCount:}})
  const tokenData = { userId:user._id,role: user.role };
  const token = jwt.sign( tokenData, process.env.JWT_SECRET , { expiresIn: '7d' });
  res.json({token:token})
};

userCltr.account = async(req,res) => {
   //res.send('user account page')
  try{
    const user = await User.findById(req.userId);
    res.json(user)
  }catch(err){
    console.log(err)
    res.status(500).json({error:'something went wrong'})
  }
}

userCltr.updatePassword = async (req, res) => {
  try {
    const userId = req.userId; // or req.user._id (depends how you signed token)

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Both passwords are required" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ error: "New password must be different" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare current password
    const isMatch = await bcryptjs.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





module.exports = userCltr;
