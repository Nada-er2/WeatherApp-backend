const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hashed });
    res.json({ message: 'User registered' });
  } catch {
    res.status(400).json({ error: 'Email already exists' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(403).json({ error: 'Invalid credentials' });
  }

  user.token = uuid();
  await user.save();
  res.json({ token: user.token });
};

exports.logout = async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.json({ message: 'Logged out' });
};
