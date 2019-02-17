const request = require('supertest');
const app = require('../app');

// integration tests on individual route path
describe('GET /images', () => {
  test('It should get all images', async () => {
    const response = await request(app).get('/images/');
    expect(response.statusCode).toBe(200);
  });
});
