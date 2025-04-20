const User = require('../models/user.model');
const generateToken = require('../config/jwt');

// POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

// POST /api/auth/login
exports.loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      next(err);
    }
  };
  