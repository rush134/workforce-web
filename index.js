const express = require('express');
const app = express();
const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`http server port: ${port}`);
});

const base = `${__dirname}/public`;

// Since .css files are static files you have to serve them to the clients. 
// However, you do not serve static files as a express middleware. 
// Add the following middleware to your express app and move the css folder under the public directory 
// (you should create a public directory)

app.use(express.static('public'));  

app.get('/', function(req, res) {
  res.sendFile(`${base}/login.html`);
});

app.get('/test', function(req, res) {
  res.sendFile(`${base}/test.html`);
});