const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const urlObj = url.parse(req.url, true);

  switch (urlObj.pathname) {
    case "/hello":
      res.end(`Hello ${urlObj?.query?.name ? `, ${urlObj.query.name}` : 'World'}`);
      break
    case "/goodbye":
      res.end(`Goodbye ${urlObj?.query?.name ? `, ${urlObj.query.name}` : ''}`);
      break
    default:
      res.statusCode = 404;
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});