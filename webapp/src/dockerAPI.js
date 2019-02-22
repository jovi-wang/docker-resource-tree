import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080'
});

// export {
//   get: (url) {
//     return client.get(url);
//   },
//     post(url) {
//   return client.post(url);
// }
// };

export default axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});
