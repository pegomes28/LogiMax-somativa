const express = require('express');
const router = express.Router();
const tripCtrl = require('../controllers/tripController');

function requireManager(req,res,next){
  if(!req.session.user || req.session.user.role !== 'manager') return res.redirect('/login');
  next();
}

router.get('/', tripCtrl.list);
router.get('/new', requireManager, tripCtrl.newForm);
router.post('/', requireManager, tripCtrl.create);
router.get('/:id/edit', requireManager, tripCtrl.editForm);
router.put('/:id', requireManager, tripCtrl.update);
router.delete('/:id', requireManager, tripCtrl.delete);

module.exports = router;
