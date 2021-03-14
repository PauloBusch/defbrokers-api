const immobileService = require('../schemas/immobile')
const { configureService } = require('./configure-service');

configureService(immobileService);

immobileService.route('sections', (req, res, next) => {
  immobileService.distinct(
    'section',
    (err, result) => {
      if (err) return res.status(500).json({ erros: [err] });
      res.json(result);
    });
});

immobileService.route('types', (req, res, next) => {
  immobileService.distinct(
    'type',
    (err, result) => {
      if (err) return res.status(500).json({ erros: [err] });
      res.json(result);
    });
});

module.exports = { immobileService };
