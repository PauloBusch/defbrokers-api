const { connect } = require('mongoose');

const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
