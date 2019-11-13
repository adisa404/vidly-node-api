const Joi = require('joi');
const mongoose = require('mongoose');

const customersSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  isGold: { type: Boolean, default: false },
  phone: { type: String, minlength: 5, maxlength: 50 }
});

const Customers = mongoose.model('Customer', customersSchema);

function validateCustomer(customer) {
  // validate
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(8)
  };

  return Joi.validate(customer, schema);
}

exports.validate = validateCustomer;
exports.Customers = Customers;
