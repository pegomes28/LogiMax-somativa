const Veiculo = require('../models/Veiculo');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');

exports.dashboard = async (req,res)=>{
  const veiculos = await Veiculo.find();
  const drivers = await Driver.find().populate('userRef');
  const trips = await Trip.find().populate('veiculo driver');
  // maintenance alerts every 10000 km
  const alerts = veiculos.filter(v => (v.kmAtual % 10000) > 9000 || v.kmAtual >= 10000);
  res.render('manager/dashboard', { veiculos, drivers, trips, alerts });
};
