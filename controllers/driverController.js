const Trip = require('../models/Trip');
const Driver = require('../models/Driver');

exports.dashboard = async (req,res)=>{
  const userId = req.session.user.id;
  const driver = await Driver.findOne({ userRef: userId });
  const trips = await Trip.find({ driver: driver ? driver._id : null }).populate('veiculo driver');
  res.render('driver/dashboard', { trips, driver });
};

exports.finalizeTrip = async (req,res)=>{
  try{
    const { id } = req.params;
    const { kmFinal } = req.body;
    const TripModel = require('../models/Trip');
    const Veiculo = require('../models/Veiculo');
    const trip = await TripModel.findById(id);
    if(!trip) return res.redirect('/driver');
    trip.status = 'Finalizada';
    trip.kmFinal = Number(kmFinal);
    trip.finishedAt = new Date();
    await trip.save();
    const veiculo = await Veiculo.findById(trip.veiculo);
    if(veiculo){
      veiculo.kmAtual = Number(kmFinal);
      await veiculo.save();
    }
    res.redirect('/driver');
  }catch(err){
    console.error(err);
    res.redirect('/driver');
  }
};
