const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const paramsName = urlObj.searchParams.get('name');

  if(req.method === "GET") {
    switch (urlObj.pathname) {
      case "/hello":
        res.statusCode = 200;
        res.end(`Hello ${paramsName ? `, ${paramsName}` : 'World'}`);
        break
      case "/goodbye":
        res.statusCode = 200;
        res.end(`Goodbye ${paramsName ? `, ${paramsName}` : ''}`);
        break
      case "/":
        res.statusCode = 404;
        res.end();
        break
    }
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});