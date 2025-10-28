const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VeiculoSchema = new Schema({
  placa: { type: String, required: true, unique: true },
  modelo: { type: String, required: true },
  ano: { type: Number, required: true },
  kmAtual: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Veiculo', VeiculoSchema);
