import CUSTOMER from '../model/customerModel.js';
// const bcrypt = require('bcrypt');

//sign up

export const signUp = async (req, res) => {
  const { firstName, lastName, password, email, confirmPassword } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    res.status(400).json({ success: false, errMsg: 'all fields are required' });
    return;
  }
  try {
    const existingEmail = await CUSTOMER.findOne({email});
    if (existingEmail) {
      res.status(400).json({ success: false, errMsg: 'Email already in use' });
      return;
    }
    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        errMsg: 'password and confirm password must match',
      });
      return;
    }
    const customer = await CUSTOMER.create({ ...req.body });
    res
      .status(201)
      .json({ success: true, message: 'registered successfully', customer });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// sign in

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ success: false, errMsg: 'all fields are required' });
    return;
  }
  try {
    // finding a registered email
    const user = await CUSTOMER.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, errMsg: 'user not found' });
      return;
    }
    // comparing hash password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      res
        .status(400)
        .json({ success: false, errMsg: 'email or password incorrect' });
      return;
    }
    //generating token
    const token = await user.generateToken();
    if (token) {
      res.status(201).json({
        success: true,
        message: 'logged in',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          token,
        },
      });
      return;
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const verify = async (req, res) => {
  return res.status(201).json({success:true, user:req.user})
}