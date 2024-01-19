const { app, listen } = require('./app');

const port = 3000;

listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
});
