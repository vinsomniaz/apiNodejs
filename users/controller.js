const sequelize = require('../common/database');
const defineUser = require('../common/models/User');
const User = defineUser(sequelize);

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'email', 'fullName', 'role'] });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'email', 'fullName', 'role']
    });
    if (!user) return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
