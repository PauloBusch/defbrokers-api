const express = require('express');
const auth = require('./midwares/auth-midware');
const { contactService } = require('./services/contact-service');
const { slideService } = require('./services/slide-service');
const { immobileService } = require('./services/immobile-service');
const { login, validateToken } = require('./services/user-service');

function routes(server) {
  const protectedApi = express.Router();
  server.use('/api', protectedApi);
  
  protectedApi.use(auth);
  
  contactService.register(protectedApi, '/contact');
  slideService.register(protectedApi, '/slides');
  immobileService.register(protectedApi, '/immobiles');
  
  
  const openApi = express.Router();
  server.use('/oapi', openApi);

  contactService.methods(['get']);
  slideService.methods(['get']);
  immobileService.methods(['get']);

  contactService.register(openApi, '/contact');
  slideService.register(openApi, '/slides');
  immobileService.register(openApi, '/immobiles');
  openApi.post('/login', login);
  openApi.post('/validate-token', validateToken);
}

module.exports = { routes };
