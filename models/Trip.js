const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  veiculo: { type: Schema.Types.ObjectId, ref: 'Veiculo', required: true },
  driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  origem: { type: String, required: true },
  destino: { type: String, required: true },
  status: { type: String, enum: ['Agendada','Em Curso','Finalizada'], default: 'Agendada' },
  kmFinal: { type: Number },
  startedAt: { type: Date },
  finishedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);
