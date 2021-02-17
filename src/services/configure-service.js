
const { errorMidware } = require('../midwares/error-midware');

function configureService(service) {
  service.methods(['get', 'post', 'put', 'delete']);
  service.updateOptions({ new: true, runValidators: true });
  service.after('post', errorMidware);
  service.after('put', errorMidware);
}

module.exports = { configureService };
