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
const mockContainerError = { response: { data: mockError } };

describe('GET /containers', () => {
  it('should get all containers - success', async () => {
    const mockContainerId = '123abc';
    const mockContainers = [{ Id: mockContainerId }];
    dockerAPI.get.mockResolvedValue({ data: mockContainers });
    // alternative syntax is
    // dockerAPI.get.mockImplementation(() => Promise.resolve(resp));

    const response = await request(app).get('/containers/');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/containers/json?all=true');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockContainers);
    expect(response.body.length).toEqual(1);
  });
  it('should get all containers - fail', async () => {
    dockerAPI.get.mockRejectedValue(mockContainerError);
    const response = await request(app).get('/containers/');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/containers/json?all=true');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('GET /containers/:containerId', () => {
  it('should get single container info - success', async () => {
    const mockContainerId = '123abc';
    const mockContainerData = { Id: mockContainerId };
    dockerAPI.get.mockResolvedValue({ data: mockContainerData });

    const response = await request(app).get('/containers/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/containers/123abc/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockContainerData);
  });
  it('should get single container info - fail', async () => {
    dockerAPI.get.mockRejectedValue(mockContainerError);

    const response = await request(app).get('/containers/123abc');
    expect(dockerAPI.get).toBeCalledTimes(1);
    expect(dockerAPI.get).toBeCalledWith('/containers/123abc/json');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});

describe('POST /containers/prune', () => {
  it('should remove unused containers - success', async () => {
    dockerAPI.post.mockResolvedValue({ data: {} });

    const response = await request(app).post('/containers/prune');
    expect(dockerAPI.post).toBeCalledWith('/containers/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });
  it('should remove unused containers - fail', async () => {
    dockerAPI.post.mockRejectedValue(mockContainerError);

    const response = await request(app).post('/containers/prune');
    expect(dockerAPI.post).toBeCalledWith('/containers/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(mockError);
  });
});
