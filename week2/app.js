const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3001;

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;

  if (method === 'GET' && reqUrl === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
      <head>
        <title>File Management Tool</title>
      </head>
      <body>
        <h1>File Management Tool</h1>
        <p>This tool allows you to perform basic file management operations:</p>
        <ul>
          <li><strong>Create a file:</strong> Send a POST request to /create with JSON body containing fileName and content.</li>
          <li><strong>Read a file:</strong> Send a GET request to /read?fileName=myfile.txt (replace myfile.txt with the name of the file).</li>
          <li><strong>Delete a file:</strong> Send a DELETE request to /delete?fileName=myfile.txt (replace myfile.txt with the name of the file).</li>
        </ul>
      </body>
      </html>
    `);
    res.end();
  } else if (method === 'POST' && reqUrl === '/create') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { fileName, content } = JSON.parse(body);
      fs.writeFile(fileName, content, err => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error creating file' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'File created successfully' }));
      });
    });
  } else if (method === 'GET' && reqUrl.startsWith('/read')) {
    const query = url.parse(reqUrl, true).query;
    const fileName = query.fileName;
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File not found' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  } else if (method === 'DELETE' && reqUrl.startsWith('/delete')) {
    const query = url.parse(reqUrl, true).query;
    const fileName = query.fileName;
    fs.unlink(fileName, err => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File not found or already deleted' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'File deleted successfully' }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
