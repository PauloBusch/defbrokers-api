const restful = require('node-restful');
const { Schema } = restful.mongoose;

const contactSchema = new Schema({
  name: { type: String, required: true, maxLength: 150 },
  whatsapp: { type: String, required: true, maxLength: 15 },
  email: { type: String, required: true, maxLength: 100 }
});

module.exports = restful.model('contact', contactSchema);
