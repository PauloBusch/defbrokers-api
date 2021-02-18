
const contactService = require('../schemas/contact');
const { errorMidware } = require('../midwares/error-midware');

contactService.methods(['get', 'post', 'put']);
contactService.updateOptions({ new: true, runValidators: true });
contactService.after('post', errorMidware);
contactService.after('put', errorMidware);

module.exports = { contactService };
