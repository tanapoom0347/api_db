const { db } = require('./db.mysql.config');
const Product = require('../models/products001/productModel');

async function authenticateAndSync() {
    try {
        await db.authenticate();
        // console.log('Database connected...');
        console.log('Connection has been established successfully.');
        await Product.sync();
        // await User.sync();
        // await Post.sync();
        console.log('All models synced successfully.');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

module.exports = authenticateAndSync;