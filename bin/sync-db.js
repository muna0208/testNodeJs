const models = require('//models');

models.sequelize.sync({force: true});

module.exports = () =>{
    return models.sequelize.sync({force: true});
}