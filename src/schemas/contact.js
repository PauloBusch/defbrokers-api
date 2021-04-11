const restful = require('node-restful');
const { Schema } = restful.mongoose;

const contactSchema = new Schema({
  name: { type: String, required: true, maxLength: 150 },
  whatsapp: { type: String, required: true, maxLength: 15 },
  email: { type: String, required: true, maxLength: 100 },
  facebookLabel: { type: String, required: true, maxLength: 150 },
  facebookLink: { type: String, required: true, maxLength: 150 },
  instagramLabel: { type: String, required: true, maxLength: 150 },
  instagramLink: { type: String, required: true, maxLength: 150 }
});

module.exports = restful.model('contact', contactSchema);
