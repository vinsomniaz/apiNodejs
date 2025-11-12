const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = require('./common/database');
const defineUser = require('./common/models/User');
const User = defineUser(sequelize);
const productRoutes = require('./products/routes');
app.use('/products', productRoutes);
const authRoutes = require('./authorization/routes');
app.use('/auth', authRoutes);

app.get('/status', (_req, res) => {
  res.json({ status: 'Running', timestamp: new Date().toISOString() });
});

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (e) {
    console.error('DB init error:', e);
  }
});
