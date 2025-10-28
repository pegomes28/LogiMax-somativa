const Veiculo = require('../models/Veiculo');

exports.list = async (req,res)=>{
  const veiculos = await Veiculo.find();
  res.render('veiculos/list', { veiculos });
};

exports.newForm = (req,res)=> res.render('veiculos/new',{ error:null });

exports.create = async (req,res)=>{
  try{
    await Veiculo.create(req.body);
    res.redirect('/veiculos');
  }catch(err){
    res.render('veiculos/new',{ error: err.message });
  }
};

exports.editForm = async (req,res)=>{
  const v = await Veiculo.findById(req.params.id);
  res.render('veiculos/edit',{ v, error:null });
};

exports.update = async (req,res)=>{
  try{
    await Veiculo.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/veiculos');
  }catch(err){
    res.render('veiculos/edit',{ v: req.body, error: err.message });
  }
};

exports.remove = async (req,res)=>{
  await Veiculo.findByIdAndDelete(req.params.id);
  res.redirect('/veiculos');
};
