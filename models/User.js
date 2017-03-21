const db = require('../utils/db');

module.exports = db.defineModel('users', {
    username: db.Sequelize.STRING(100),
    passwd: db.Sequelize.STRING(100)
});