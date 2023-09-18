const { Sequelize } = require('sequelize');
const { db } = require('../../db/db.mysql.config');

const { DataTypes } = Sequelize;
 
const Product = db.define('products0001',{
    title:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.DOUBLE
    }
},{
    freezeTableName: true
});

module.exports = Product;