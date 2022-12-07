const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const list = await Item.getAll(req.user.id);
      res.json(list);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const newItem = await Item.updateById(req.params.id, req.body);
      if (!newItem) next();
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const newItem = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const deleteItem = await Item.delete(req.params.id);
      if (!deleteItem) next();
      res.status(200);
      res.send();
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
