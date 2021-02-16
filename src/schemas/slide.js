const { Schema } = require('node-restful').mongoose;

const slideSchema = new Schema({
  image: { type: String, required: true },
  positionX: { type: String, required: true, lowercase: true, enum: ['left', 'center', 'right'] },
  positionY: { type: String, required: true, lowercase: true, enum: ['top', 'center', 'bottom'] }
});

module.exports = { slideSchema };
