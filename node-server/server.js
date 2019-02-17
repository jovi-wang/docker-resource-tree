const app = require('./app');
// we seprate our app and server for testing purpose
const port = 8080;
app.listen(port, () => console.log(`Express middleware listening on port ${port}!`));
