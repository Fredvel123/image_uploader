const app = require('./app');

const port = app.get('port');

app.get('/', (req, res) => {
  res.send('The server is running successfully!')
} )

app.listen(port, () => {
  console.log(`the server is listing on port: ${port}`);
} )