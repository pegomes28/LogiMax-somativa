const express = require('express');
const router = express.Router();
const veiculoCtrl = require('../controllers/veiculoController');

// simple auth: manager required for create/edit/delete
function requireManager(req,res,next){
  if(!req.session.user || req.session.user.role !== 'manager') return res.redirect('/login');
  next();
}

router.get('/', veiculoCtrl.list);
router.get('/new', requireManager, veiculoCtrl.newForm);
router.post('/', requireManager, veiculoCtrl.create);
router.get('/:id/edit', requireManager, veiculoCtrl.editForm);
router.put('/:id', requireManager, veiculoCtrl.update);
router.delete('/:id', requireManager, veiculoCtrl.remove);

module.exports = router;
