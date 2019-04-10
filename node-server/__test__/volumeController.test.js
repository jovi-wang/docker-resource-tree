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
const mockVolumeError = { response: { data: mockError } };

describe('GET /volumes', () => {
  it('should get all volumes - success', async () => {
    const mockVolumeId = '123abc';
    const mockVolumes = [{ Id: mockVolumeId }, { Id: '098zyx' }];
    dockerAPI.get.mockResolvedValue({ data: mockVolumes });
    // alternative syntax is
    // dockerAPI.get.mockImplementation(() => Promise.resolve(resp));

    const response = await request(app).get('/volumes/');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/volumes');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(2);
  });
  it('should get all volumes - fail', async () => {
    dockerAPI.get.mockRejectedValue(mockVolumeError);

    const response = await request(app).get('/volumes/');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/volumes');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('GET /volumes/:volumeId', () => {
  it('should get single volume info - success', async () => {
    const mockVolumeId = 'sha256:123abc';
    const mockVolumeData = { Id: mockVolumeId };
    dockerAPI.get.mockResolvedValue({ data: mockVolumeData });

    const response = await request(app).get('/volumes/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/volumes/123abc');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockVolumeData);
  });
  it('should get single volume info - fail', async () => {
    dockerAPI.get.mockRejectedValue(mockVolumeError);

    const response = await request(app).get('/volumes/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/volumes/123abc');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('POST /volumes/prune', () => {
  it('should remove unused volumes - success', async () => {
    dockerAPI.post.mockResolvedValue({ data: {} });

    const response = await request(app).post('/volumes/prune');
    expect(dockerAPI.post).toBeCalledWith('/volumes/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });
  it('should remove unused volumes - fail', async () => {
    dockerAPI.post.mockRejectedValue(mockVolumeError);

    const response = await request(app).post('/volumes/prune');
    expect(dockerAPI.post).toBeCalledWith('/volumes/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});
