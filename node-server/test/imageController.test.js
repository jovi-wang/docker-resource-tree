const request = require('supertest');
const app = require('../app');

// put jest mock before import module
jest.mock('../dockerAPI');
const dockerAPI = require('../dockerAPI');

describe('GET /images', () => {
  test('should get all images', async () => {
    const mockImages = [{ id: 'sha256:123' }];
    dockerAPI.get.mockResolvedValue({ data: mockImages });
    // alternative syntax is
    // dockerAPI.get.mockImplementation(() => Promise.resolve(resp));

    const response = await request(app).get('/images/');
    expect(dockerAPI.get).toBeCalled();
    expect(dockerAPI.get).toBeCalledWith('/images/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockImages);
  });
});
jest.clearAllMocks();
