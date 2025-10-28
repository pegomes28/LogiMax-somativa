const Trip = require('../models/Trip');
const Veiculo = require('../models/Veiculo');
const Driver = require('../models/Driver');

exports.list = async (req,res)=>{
  const trips = await Trip.find().populate('veiculo driver');
  res.render('trips/list',{ trips });
};

exports.newForm = async (req,res)=>{
  const veiculos = await Veiculo.find();
  const drivers = await Driver.find();
  res.render('trips/new',{ veiculos, drivers, error:null });
};

exports.create = async (req,res)=>{
  try{
    await Trip.create(req.body);
    res.redirect('/trips');
  }catch(err){
    res.redirect('/trips');
  }
};

exports.editForm = async (req,res)=>{
  const t = await Trip.findById(req.params.id).populate('veiculo driver');
  const veiculos = await Veiculo.find();
  const drivers = await Driver.find();
  res.render('trips/edit',{ t, veiculos, drivers, error:null });
};

exports.update = async (req,res)=>{
  await Trip.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/trips');
};

exports.delete = async (req,res)=>{
  await Trip.findByIdAndDelete(req.params.id);
  res.redirect('/trips');
};
