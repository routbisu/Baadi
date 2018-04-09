var http = require('http');

//create a server object:
http.createServer((req, res) => {
    console.log('Server started!');
  res.write('Hello World Child!'); //write a response to the client
  res.end(); //end the response
}).listen(8080);