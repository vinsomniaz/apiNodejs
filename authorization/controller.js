const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sequelize = require('../common/database');
const defineUser = require('../common/models/User');
const User = defineUser(sequelize);

const encryptPassword = (password) =>
  crypto.createHash('sha256').update(password).digest('hex');

const generateAccessToken = (email, userId, role) =>
  jwt.sign({ email, userId, role }, 'your-secret-key', { expiresIn: '24h' });

exports.register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const encryptedPassword = encryptPassword(password);

    const user = await User.create({
      email,
      password: encryptedPassword,
      fullName
    });

    const token = generateAccessToken(user.email, user.id, user.role);

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      },
      token
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
