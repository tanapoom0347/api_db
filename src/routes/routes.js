module.exports = app => {
    const user123Router = require('./users123sample/router');
    const std001Router = require('./students123sample/router');

    app.use('/user123', user123Router);
    app.use('/std001', std001Router);
};