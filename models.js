//For models

//model for taxpayer
const mongoose = require('mongoose');

const payerSchema = new mongoose.Schema({
  payersName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  annualIncome: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Payer', payerSchema);

//model for assets
const mongooseSequence = require('mongoose-sequence');

const assetSchema = new mongoose.Schema({
  assetName: {
    type: String,
    required: true,
  },
  estimatedCost: {
    type: Number,
    required: true,
  },
  ownerTIN: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  assetNumber: {
    type: Number,
    unique: true,
  },
});

// Automatically generate asset number upon submission
assetSchema.pre('save', async function (next) {
  if (!this.assetNumber) {
    const Asset = mongoose.model('Asset');
    const assetNumber = await Asset.getNextSequenceValue();
    this.assetNumber = assetNumber;
  }
  next();
});

// Configure mongoose-sequence for asset number generation
mongooseSequence.configure({
  name: 'asset_number_seq',
  collectionName: 'counters',
  inc: 1,
});



module.exports = mongoose.model('Asset', assetSchema);