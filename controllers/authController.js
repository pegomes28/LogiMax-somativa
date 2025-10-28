const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.showLogin = (req,res)=>{
  res.render('auth/login', { error: null });
};

exports.showRegister = (req,res)=>{
  res.render('auth/register', { error: null });
};

exports.register = async (req,res)=>{
  try{
    const { name,email,password,role } = req.body;
    const exists = await User.findOne({ email });
    if(exists) return res.render('auth/register', { error: 'Email já cadastrado' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name,email,password:hash,role });
    req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
    if(user.role === 'manager') return res.redirect('/manager');
    return res.redirect('/driver');
  }catch(err){
    console.error(err);
    return res.render('auth/register', { error: 'Erro no cadastro' });
  }
};

exports.login = async (req,res)=>{
  try{
    const { email,password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.render('auth/login', { error: 'Credenciais inválidas' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.render('auth/login', { error: 'Credenciais inválidas' });
    req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
    if(user.role === 'manager') return res.redirect('/manager');
    return res.redirect('/driver');
  }catch(err){
    console.error(err);
    return res.render('auth/login', { error: 'Erro no login' });
  }
};

exports.logout = (req,res)=>{
  req.session.destroy(()=> res.redirect('/'));
};
