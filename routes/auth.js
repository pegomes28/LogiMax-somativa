const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

// home
router.get('/', (req,res)=> res.render('home'));

// auth
router.get('/login', authCtrl.showLogin);
router.post('/login', authCtrl.login);
router.get('/register', authCtrl.showRegister);
router.post('/register', authCtrl.register);
router.post('/logout', authCtrl.logout);

module.exports = router;
