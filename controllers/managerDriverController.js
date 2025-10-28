// manager's driver CRUD views are simple and use Driver model
const Driver = require('../models/Driver');

exports.list = async (req,res)=>{
  const drivers = await Driver.find().populate('userRef');
  res.render('drivers/list',{ drivers });
};

exports.newForm = (req,res)=> res.render('drivers/new', { error:null });

exports.create = async (req,res)=>{
  try{
    await Driver.create(req.body);
    res.redirect('/manager/drivers');
  }catch(err){
    res.render('drivers/new',{ error: err.message });
  }
};

exports.editForm = async (req,res)=>{
  const d = await Driver.findById(req.params.id);
  res.render('drivers/edit',{ d, error:null });
};

exports.update = async (req,res)=>{
  await Driver.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/manager/drivers');
};

exports.remove = async (req,res)=>{
  await Driver.findByIdAndDelete(req.params.id);
  res.redirect('/manager/drivers');
};
