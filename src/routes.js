const express = require('express');
const { contactService } = require('./services/contact-service');
const { slideService } = require('./services/slide-service');
const { sectionService } = require('./services/section-service');
const { immobileService } = require('./services/immobile-service');

function routes(server) {
  const api = express.Router();
  
  contactService.register(api, '/contact');
  slideService.register(api, '/slides');
  sectionService.register(api, '/sections');
  immobileService.register(api, '/sections/:sectionId/immobiles');
  
  server.use('/api', api);
}

module.exports = { routes };
