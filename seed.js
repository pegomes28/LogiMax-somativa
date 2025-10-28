require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Driver = require('./models/Driver');
const Veiculo = require('./models/Veiculo');
const Trip = require('./models/Trip');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/sgm_logimax';

async function seed(){
  await mongoose.connect(MONGO);
  console.log('Connected');

  await User.deleteMany({});
  await Driver.deleteMany({});
  await Veiculo.deleteMany({});
  await Trip.deleteMany({});

  const hash = await bcrypt.hash('password',10);
  const manager = await User.create({ name:'The Dhalia', email:'theDhalia@gerente.com', password:hash, role:'manager' });
  const driverUser = await User.create({ name:'Acheron Bosenmori', email:'acheron@motorista.com', password:hash, role:'driver' });

  const driver = await Driver.create({
    name: "Acheron Bosenmori",
    documento: "815.700.359-89",
    telefone: "(44)29819-3458",
    userRef: driverUser._id,
  });

  const v1 = await Veiculo.create({ placa:'BCZ-6639', modelo:'Pontiac Aztek', ano:2018, kmAtual: 9500 });
  const v2 = await Veiculo.create({ placa:'APS-5174', modelo:'Cadillac Cimarron', ano:2020, kmAtual: 20000 });

  const t1 = await Trip.create({ veiculo: v1._id, driver: driver._id, origem:'Minaçu', destino:'Anápolis', status:'Agendada' });
  const t2 = await Trip.create({ veiculo: v2._id, driver: driver._id, origem:'Caruaru', destino:'Abreu e Lima', status:'Em Curso' });

  console.log('Seed done. Manager login: theDhalia@gerente.com / password');
  process.exit(0);
}

seed().catch(err=>{ console.error(err); process.exit(1); });
