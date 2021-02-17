const sectionService = require('../schemas/section');
const { configureService } = require('./configure-service');

configureService(sectionService);

module.exports = { sectionService };
