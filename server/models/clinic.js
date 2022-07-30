const { Schema, model } = require('mongoose');

const clinicSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const clinic = model('Clinic', clinicSchema);

module.exports = Clinic;
