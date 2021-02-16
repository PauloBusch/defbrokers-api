const { Schema } = require('node-restful').mongoose;
const { imoobileSchema } = require('./immobile');

const sectionSchema = new Schema({
  title: { type: String, required: true },
  immobiles: [imoobileSchema]
});

module.exports = { sectionSchema };
