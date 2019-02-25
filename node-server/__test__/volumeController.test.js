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

describe('GET /volumes', () => {
  it('should get all volumes', async () => {
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
});

describe('GET /volumes/:imageId', () => {
  it('should get single image info', async () => {
    const mockVolumeId = 'sha256:123abc';
    const mockImageData = { Id: mockVolumeId };
    dockerAPI.get.mockResolvedValue({ data: mockImageData });

    const response = await request(app).get('/volumes/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/volumes/123abc');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockImageData);
  });
});

describe('POST /volumes/prune', () => {
  it('should remove unused volumes', async () => {
    dockerAPI.post.mockResolvedValue({ data: {} });

    const response = await request(app).post('/volumes/prune');
    expect(dockerAPI.post).toBeCalledWith('/volumes/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeFalsy();
  });
});
