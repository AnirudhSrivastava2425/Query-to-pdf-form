const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    price: String,
    wattage: String,
    connectorType: String,
    outputVoltage: String,
    vehicleType: String,
    chargingTime: String,
    chargerID: String,
    productImagelocation: String,
});

module.exports = mongoose.model('chargers',schema)