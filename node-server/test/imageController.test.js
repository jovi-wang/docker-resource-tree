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

describe('GET /images', () => {
  test('should get all images', async () => {
    const mockImageId = 'sha256:123abc';
    const mockImages = [{ Id: mockImageId }];
    dockerAPI.get.mockResolvedValue({ data: mockImages });
    // alternative syntax is
    // dockerAPI.get.mockImplementation(() => Promise.resolve(resp));

    const response = await request(app).get('/images/');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/images/json?all=true');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockImages);
  });
});

describe('GET /images/:imageId', () => {
  test('should get single image info', async () => {
    const mockImageId = 'sha256:123abc';
    const mockImageData = { Id: mockImageId };
    dockerAPI.get.mockResolvedValue({ data: mockImageData });

    const response = await request(app).get('/images/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/images/123abc/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockImageData);
  });
});

describe('GET /images/:imageId/history', () => {
  test('should get single image info build history', async () => {
    const mockImageId = 'sha256:123abc';
    const mockImageData = { Id: mockImageId };
    dockerAPI.get.mockResolvedValue({ data: mockImageData });

    const response = await request(app).get('/images/123abc/history');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/images/123abc/history');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockImageData);
  });
});

describe('POST /images/:imageId/tag', () => {
  test('should tag a image with repo and tag', async () => {
    dockerAPI.post.mockResolvedValue({ data: {} });

    const response = await request(app)
      .post('/images/123abc/tag')
      .send({ repo: 'mockRepo', tag: '0.1' });
    expect(dockerAPI.post).toBeCalledTimes(1);
    expect(dockerAPI.post).toBeCalledWith('/images/123abc/tag?repo=mockRepo&tag=0.1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeFalsy();
  });
});

describe('POST /images/prune', () => {
  test('should remove unused images', async () => {
    dockerAPI.post.mockResolvedValue({ data: {} });

    const response = await request(app).post('/images/prune');
    expect(dockerAPI.post).toBeCalledWith('/build/prune?all=true');
    expect(dockerAPI.post).toBeCalledWith('/images/prune');
    expect(dockerAPI.post).toBeCalledTimes(2);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeFalsy();
  });
});
