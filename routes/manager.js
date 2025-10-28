const express = require('express');
const router = express.Router();
const managerCtrl = require('../controllers/managerController');
const driverCtrl = require('../controllers/managerDriverController');

// middleware
function requireManager(req,res,next){
  if(!req.session.user || req.session.user.role !== 'manager') return res.redirect('/login');
  next();
}

router.get('/', requireManager, managerCtrl.dashboard);

// driver management under manager
router.get('/drivers', requireManager, driverCtrl.list);
router.get('/drivers/new', requireManager, driverCtrl.newForm);
router.post('/drivers', requireManager, driverCtrl.create);
router.get('/drivers/:id/edit', requireManager, driverCtrl.editForm);
router.put('/drivers/:id', requireManager, driverCtrl.update);
router.delete('/drivers/:id', requireManager, driverCtrl.remove);

module.exports = router;
