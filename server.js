const express = require('express');
const jsonServer = require('json-server');
const server = express();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'coins.json'));
var PORT = process.env.PORT || 3000;

server.use('/api/v1', router);

server.use(express.static(path.join(__dirname, 'client/public/')));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'client/public/index.html'));
});

server.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}`);
});
