const request = require('supertest');
const app = require('../app');

// put jest mock before import module
jest.mock('../dockerAPI');
const dockerAPI = require('../dockerAPI');

afterEach(() => {
  dockerAPI.get.mockClear();
  dockerAPI.post.mockClear();
  dockerAPI.delete.mockClear();
});

afterAll(() => {
  jest.clearAllMocks();
});
// global variables for error
const mockError = { message: 'Async error' };
const mockImageError = { response: { data: mockError } };

describe('GET /images', () => {
  it('should get all images - success', async () => {
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
  it('should get all images - fail', async () => {
    dockerAPI.get.mockRejectedValue(mockImageError);

    const response = await request(app).get('/images/');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/images/json?all=true');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('GET /images/:imageId', () => {
  it('should get single image info - success', async () => {
    const mockImageId = 'sha256:123abc';
    const mockImageData = { Id: mockImageId };
    dockerAPI.get.mockResolvedValue({ data: mockImageData });

    const response = await request(app).get('/images/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/images/123abc/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockImageData);
  });
  it('should get single image info - fail', async () => {
    dockerAPI.get.mockRejectedValue(mockImageError);

    const response = await request(app).get('/images/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/images/123abc/json');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('GET /images/:imageId/history', () => {
  it('should get single image info build history - success', async () => {
    const mockImageId = 'sha256:123abc';
    const mockImageData = { Id: mockImageId };
    dockerAPI.get.mockResolvedValue({ data: mockImageData });

    const response = await request(app).get('/images/123abc/history');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/images/123abc/history');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockImageData);
  });
  it('should get single image info build history - fail', async () => {
    dockerAPI.get.mockRejectedValue(mockImageError);

    const response = await request(app).get('/images/123abc/history');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/images/123abc/history');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('POST /images/:imageId/tag', () => {
  it('should tag a image with repo and tag - success', async () => {
    dockerAPI.post.mockResolvedValue({ data: {} });

    const response = await request(app)
      .post('/images/123abc/tag')
      .send({ repo: 'mockRepo', tag: '0.1' });
    expect(dockerAPI.post).toBeCalledTimes(1);
    expect(dockerAPI.post).toBeCalledWith('/images/123abc/tag?repo=mockRepo&tag=0.1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeFalsy();
  });
  it('should tag a image with repo and tag - success', async () => {
    dockerAPI.post.mockRejectedValue(mockImageError);

    const response = await request(app)
      .post('/images/123abc/tag')
      .send({ repo: 'mockRepo', tag: '0.1' });
    expect(dockerAPI.post).toBeCalledTimes(1);
    expect(dockerAPI.post).toBeCalledWith('/images/123abc/tag?repo=mockRepo&tag=0.1');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('POST /images/prune', () => {
  it('should remove unused images - success', async () => {
    dockerAPI.post.mockResolvedValue({ data: {} });

    const response = await request(app).post('/images/prune');
    expect(dockerAPI.post).toBeCalledWith('/build/prune?all=true');
    expect(dockerAPI.post).toBeCalledWith('/images/prune');
    expect(dockerAPI.post).toBeCalledTimes(2);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });
  it('should remove unused images - fail', async () => {
    dockerAPI.post.mockRejectedValue(mockImageError);

    const response = await request(app).post('/images/prune');
    expect(dockerAPI.post).toBeCalledWith('/build/prune?all=true');
    // expect(dockerAPI.post).toBeCalledWith('/images/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('DELETE /images/:imageId', () => {
  it('should delete single image - success', async () => {
    dockerAPI.delete.mockResolvedValue({ data: [] });

    const response = await request(app).delete('/images/123abc');
    expect(dockerAPI.delete).toBeCalledWith('/images/123abc');
    expect(dockerAPI.delete).toBeCalledTimes(1);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
  it('should delete single image - fail', async () => {
    dockerAPI.delete.mockRejectedValue(mockImageError);

    const response = await request(app).delete('/images/456def');
    expect(dockerAPI.delete).toBeCalledWith('/images/456def');
    expect(dockerAPI.delete).toBeCalledTimes(1);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});
