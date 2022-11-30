const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const list = await Item.getAll();
      res.json(list);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const newItem = await Item.insert(req.body);
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
