const jwt = require('jsonwebtoken');
const User = require('./user.schema');

/* ========== TOKENS ========== */
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

/* ========== AUTH ========== */
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({
      email,
      password,
      name,
      role: 'CUSTOMER'
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const exists = user.refreshTokens.find(t => t.token === token);
    if (!exists) {
      return res.status(401).json({ message: 'Token revoked' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshTokens = user.refreshTokens.filter(t => t.token !== token);
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

/* ========== ADMIN ========== */
exports.getAllUsers = async (req, res) => {
  const users = await User.find()
    .select('-password -refreshTokens');

  res.json({
    count: users.length,
    users
  });
};
