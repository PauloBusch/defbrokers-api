const slideService = require('../schemas/slide');
const { configureService } = require('./configure-service');

configureService(slideService);

module.exports = { slideService };
