module.exports = app => {
    const user123Router = require('./users123sample/router');
    const std001Router = require('./students123sample/router');
    const users001Router = require('./users001/router');
    const products001Router = require('./products001/router');
    const producttest002 = require('./producttest002/router');
    const product003 = require('./product003/router');
    const emp001 = require('./emp001/router');

    app.use('/api/user123', user123Router);
    app.use('/api/std001', std001Router);
    app.use('/api/users001', users001Router);
    app.use('/api/products001', products001Router);
    app.use('/api/producttest002', producttest002);
    app.use('/api/product003', product003);
    app.use('/api/emp001', emp001);
};