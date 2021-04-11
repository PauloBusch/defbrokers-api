const seeder = require('mongoose-seed');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config({ path: '.env' });
 
const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
seeder.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, function() {
 
  seeder.loadModels(['src/schemas/contact.js']);
  seeder.loadModels(['src/schemas/user.js']);
 
  seeder.clearModels(['contact', 'user'], function() {
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync('ST@564897', salt);

const data = [
  {
    model: 'user',
    documents: [
      {
        _id: '602da0bfa365f8621842205c',
        name: 'Administrador',
        email: 'demetriussobrado@gmail.com',
        password: hash
      }
    ]
  },
  {
    model: 'contact',
    documents: [
      {
        _id: '602da0bfa365f8621842205a',
        name: 'A DEF Brokers',
        whatsapp: '(62) 99253-7258',
        email: 'contato@defbrokers.com.br',
        facebookLabel: 'DEF-Brokers-Imobiliária',
        facebookLink: 'https://www.facebook.com/DEF-Brokers-Imobili%C3%A1ria-108233194084868',
        instagramLabel: 'defbrokers_imobiliaria',
        instagramLink: 'https://www.instagram.com/defbrokers_imobiliaria/'
      }
    ]
  }
];
