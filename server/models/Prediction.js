const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },

  bhk: {
    type: Number,
    required: true,
  },

  area: {
    type: Number,
    required: true,
  },

  bathrooms: {
    type: Number,
    required: true,
  },

  predictedPrice: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prediction", predictionSchema);