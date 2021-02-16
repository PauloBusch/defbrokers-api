const { Schema } = require('node-restful').mongoose;
const { contactSchema } = require('./contact');
const { sectionSchema } = require('./section');

const appSchema = new Schema({
  contact: contactSchema,
  sections: [sectionSchema]
});

module.exports = { appSchema };
