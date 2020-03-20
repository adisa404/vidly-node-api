const { Users } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('generateAuthToken', () => {
  it('should create a token', () => {
    const testObject = { _id: new mongoose.Types.ObjectId().toHexString() };
    const user = new Users(testObject);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

    expect(decoded).toMatchObject(testObject);
  });
});
