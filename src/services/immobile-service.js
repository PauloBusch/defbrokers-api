const { imoobileModel } = require('../schemas/immobile')
const { configureService } = require('./configure-service');
const immobileService = imoobileModel;

configureService(immobileService);

module.exports = { immobileService };
