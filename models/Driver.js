const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: { type: String, required: true },
  documento: { type: String },
  telefone: { type: String },
  userRef: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Driver', DriverSchema);
