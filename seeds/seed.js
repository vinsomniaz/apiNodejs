require('dotenv').config();
const sequelize = require('../common/database');

const defineProduct = require('../common/models/Product');
const Product = defineProduct(sequelize);

async function run() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const items = [
      {
        name: 'Caramel Macchiato',
        description: 'Rich espresso with caramel drizzle and milk foam.',
        imageUrl: 'https://drive.google.com/file/d/19UUKZ8Oo-Ft36Uyuk5OcsV14z7ongzK8/view?usp=drive_link',
        price: 4.00,
        category: 'hot drink',
        isNew: true
      },
      {
        name: 'Vanilla Latte',
        description: 'Delicate espresso with vanilla syrup and milk foam.',
        imageUrl: 'https://drive.google.com/file/d/1kZOZYKG6zIQICub0wt7dnLyDQZtkwvXP/view?usp=drive_link',
        price: 3.00,
        category: 'hot drink',
        isNew: true
      },
      {
        name: 'White Choco Mocha',
        description: 'Espresso with white chocolate and steamed milk.',
        imageUrl: 'https://drive.google.com/file/d/1zE0iAihzlS_w00CiG2w_A2UgU5yfwKNe/view?usp=drive_link',
        price: 4.70,
        category: 'hot drink',
        isNew: false
      },
      {
        name: 'Traditional Cappuccino',
        description: 'Chocolate + espresso + milk foam. Classic.',
        imageUrl: 'https://drive.google.com/file/d/1lDxVwKrevUwv_ihu5_AZOjiRgeuZNTpP/view?usp=drive_link',
        price: 3.80,
        category: 'hot drink',
        isNew: false
      }
    ];

    await Product.bulkCreate(items, { ignoreDuplicates: true });
    console.log('✅ Seed completado');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

run();
