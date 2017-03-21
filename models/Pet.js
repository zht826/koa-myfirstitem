const db = require('../utils/db');

module.exports = db.defineModel('pets', {
    id: {
        type: db.Sequelize.STRING(50),
        primaryKey: true
    },
    name: db.Sequelize.STRING(100),
    gender: db.Sequelize.BOOLEAN,
    birth: db.Sequelize.STRING(10),
    createdAt: db.Sequelize.BIGINT,
    updatedAt: db.Sequelize.BIGINT,
    version: db.Sequelize.BIGINT
});