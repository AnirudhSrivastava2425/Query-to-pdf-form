const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: String,
  mobile: String,
  email: String,
  city: String,
  state: String,
  selectedLocation: Array(String),
  selectedChargers: Array(String),
});

module.exports = mongoose.model('userData',schema)