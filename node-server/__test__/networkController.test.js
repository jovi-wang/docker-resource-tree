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

// global variables for error
const mockError = { message: 'Async error' };
const mockNetworkError = { response: { data: mockError } };

describe('GET /networks', () => {
  it('should get all networks - success', async () => {
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
  it('should get all networks - fail', async () => {
    dockerAPI.get.mockRejectedValue(mockNetworkError);

    const response = await request(app).get('/networks/');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/networks');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('GET /networks/:networkId', () => {
  it('should get single network info - success', async () => {
    const mockNetworkId = 'sha256:123abc';
    const mockNetworkData = { Id: mockNetworkId };
    dockerAPI.get.mockResolvedValue({ data: mockNetworkData });

    const response = await request(app).get('/networks/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/networks/123abc');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockNetworkData);
  });
  it('should get single network info - fail', async () => {
    dockerAPI.get.mockRejectedValue(mockNetworkError);

    const response = await request(app).get('/networks/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/networks/123abc');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('POST /networks/prune', () => {
  it('should remove unused networks - success', async () => {
    const mockData = [];
    dockerAPI.post.mockResolvedValue({ data: mockData });

    const response = await request(app).post('/networks/prune');
    expect(dockerAPI.post).toBeCalledWith('/networks/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockData);
  });
  it('should remove unused networks - fail', async () => {
    dockerAPI.post.mockRejectedValue(mockNetworkError);

    const response = await request(app).post('/networks/prune');
    expect(dockerAPI.post).toBeCalledWith('/networks/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});
