const restful = require('node-restful');
const { Schema } = restful.mongoose;
const { imoobileSchema } = require('./immobile');

const sectionSchema = new Schema({
  title: { type: String, required: true },
  immobiles: [imoobileSchema]
});

module.exports = restful.model('section', sectionSchema);
