const request = require('supertest');
const app = require('../app');

// put jest mock before import module
jest.mock('../dockerAPI');
const dockerAPI = require('../dockerAPI');

afterEach(() => {
  dockerAPI.get.mockClear();
  dockerAPI.post.mockClear();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('GET /networks', () => {
  it('should get all networks', async () => {
    const mockNetworkId = '123abc';
    const mockNetworks = [{ Id: mockNetworkId }];
    dockerAPI.get.mockResolvedValue({ data: mockNetworks });
    // alternative syntax is
    // dockerAPI.get.mockImplementation(() => Promise.resolve(resp));

    const response = await request(app).get('/networks/');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/networks');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockNetworks);
  });
});

describe('GET /networks/:imageId', () => {
  it('should get single image info', async () => {
    const mockNetworkId = 'sha256:123abc';
    const mockImageData = { Id: mockNetworkId };
    dockerAPI.get.mockResolvedValue({ data: mockImageData });

    const response = await request(app).get('/networks/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/networks/123abc');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockImageData);
  });
});

describe('POST /networks/prune', () => {
  it('should remove unused networks', async () => {
    dockerAPI.post.mockResolvedValue({ data: {} });

    const response = await request(app).post('/networks/prune');
    expect(dockerAPI.post).toBeCalledWith('/networks/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeFalsy();
  });
});
