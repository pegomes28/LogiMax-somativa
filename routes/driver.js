const express = require('express');
const router = express.Router();
const driverCtrl = require('../controllers/driverController');

function requireDriver(req,res,next){
  if(!req.session.user || req.session.user.role !== 'driver') return res.redirect('/login');
  next();
}

router.get('/', requireDriver, driverCtrl.dashboard);
router.post('/trips/:id/finalize', requireDriver, driverCtrl.finalizeTrip);

module.exports = router;
