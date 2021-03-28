const express = require('express');
const auth = require('./midwares/auth-midware');
const { contactService } = require('./services/contact-service');
const { slideService } = require('./services/slide-service');
const { immobileService } = require('./services/immobile-service');
const { login, validateToken, changePassword } = require('./services/user/user-service');
const { forgotPassword } = require('./services/user/user-forgot-passeword');
const { sendCurriculum } = require('./services/curriculum-service');

function routes(server) {
  const protectedApi = express.Router();
  server.use('/api', protectedApi);
  
  protectedApi.use(auth);
  
  contactService.register(protectedApi, '/contact');
  slideService.register(protectedApi, '/slides');
  immobileService.register(protectedApi, '/immobiles');
  protectedApi.post('/change-password', changePassword);
  
  const openApi = express.Router();
  server.use('/oapi', openApi);

  contactService.methods(['get']);
  slideService.methods(['get']);
  immobileService.methods(['get']);

  contactService.register(openApi, '/contact');
  slideService.register(openApi, '/slides');
  immobileService.register(openApi, '/immobiles');
  openApi.post('/login', login);
  openApi.post('/curriculum', sendCurriculum);
  openApi.post('/validate-token', validateToken);
  openApi.post('/forgot-password', forgotPassword);
}

module.exports = { routes };
