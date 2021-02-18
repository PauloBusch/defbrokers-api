const restful = require('node-restful');
const { Schema } = restful.mongoose;

const addressSchema = new Schema({
  uf: { type: String, uppercase: true, required: true, minLength: 2, maxLength: 2 },
  city: { type: String, required: true, maxLength: 150 }
});

const imoobileSchema = new Schema({
  type: { type: String, required: true },
  section: { type: String, required: true },
  realtorPhone: { type: String, required: true, maxLength: 15 },
  name: { type: String, required: true, maxLength: 150 },
  address: addressSchema,
  operation: { type: String, required: true, uppercase: true, enum: ['VENDA', 'ALUGUEL'] },
  price: { type: Number, min: 100, required: true },
  image: { type: String, maxLength: 100, required: true },
  description: { type: String, maxLength: 500, required: true },
  differentials: [String],
  photos: [String],
  badrooms: { type: Number, min: 0, required: true, default: 0 },
  bathrooms: { type: Number, min: 0, required: true, default: 0 },
  parkingSpaces: { type: Number, min: 0, required: true, default: 0 },
  area: { type: Number, min: 10, required: true }
});

module.exports = restful.model('immobile', imoobileSchema);
