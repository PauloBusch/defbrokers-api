const seeder = require('mongoose-seed');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
 
const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
seeder.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, function() {
 
  seeder.loadModels(['src/schemas/contact.js']);
 
  seeder.clearModels(['contact'], function() {
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
var data = [
  {
    model: 'contact',
    documents: [
      {
        _id: '602da0bfa365f8621842205a',
        name: 'A DEF Brokers',
        whatsapp: '(62) 99253-7258',
        email: 'contato@defbrokers.com.br'
      }
    ]
  }
];
