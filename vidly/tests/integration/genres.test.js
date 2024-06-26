let server;
const request = require('supertest');
const mongoose = require('mongoose');
const { Genres } = require('../../models/genre');

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index.js');
  });
  afterEach(async () => {
    server.close();
    await Genres.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genres.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' }
      ]);

      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
    });
  });

  describe('GET /id', () => {
    it('should return one genre', async () => {
      const genre = new Genres({ name: 'genre1' });
      await genre.save();

      let res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      console.log('### res.body', res.body);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 when passed an invalid id', async () => {
      let res = await request(server).get(`/api/genres/1`);
      console.log('res.status', res.status);
      expect(res.status).toBe(404);
    });
  });
});
