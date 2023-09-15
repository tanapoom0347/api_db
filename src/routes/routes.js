module.exports = app => {
    const user123Router = require('./users123sample/router');
    const std001Router = require('./students123sample/router');
    const users0001Router = require('./users0001/router');

    app.use('/api/user123', user123Router);
    app.use('/api/std001', std001Router);
    app.use('/api/users0001', users0001Router);
};