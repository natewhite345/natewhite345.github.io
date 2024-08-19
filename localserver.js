const http = require('http');
const fs = require('fs');

const PORT = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
    try{
        pdfContents = fs.readFileSync(__dirname+req.url)
        res.writeHead(200, { 'Content-Type': 'application/pdf' , "access-control-allow-origin": "*"})
        res.end(pdfContents)
    } catch(e) {
        console.error(e)
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});