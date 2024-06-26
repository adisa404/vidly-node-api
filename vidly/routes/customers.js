const router = require('express').Router();
const { Customers, validate } = require('../models/customer');

// register routes
router.get('/', async (req, res) => {
  const customers = await Customers.find().sort('name');
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customers.findById(req.params.id);
  if (!customer)
    return res.status(400).send('customer with the given Id was not found.');
  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const customer = new Customers({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });

  await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  // validation before updating
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const customer = await Customers.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }
    },
    { new: true }
  );
  if (!customer)
    return res.status(400).send('The customer with the given ID was not found');

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customers.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send('customer not found');

  res.send(customer);
});

module.exports = router;
