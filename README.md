# Node.js Cluster

This is a basic guide on how to create a Node.js cluster to improve the performance and scalability of your Node.js applications by utilizing multiple CPU cores.

## Prerequisites

- Node.js installed on your machine.

## Getting Started

1. Clone or download this repository to your local machine.

2. Navigate to the project directory.

3. Create a JavaScript file (e.g., `cluster.js`) and copy the following code into it:

   ```javascript
   const cluster = require('cluster');
   const http = require('http');
   const numCPUs = require('os').cpus().length;

   if (cluster.isMaster) {
     console.log(`Master process is running on process ID ${process.pid}`);

     for (let i = 0; i < numCPUs; i++) {
       cluster.fork();
     }

     cluster.on('exit', (worker, code, signal) => {
       console.log(`Worker ${worker.process.pid} died`);
     });
   } else {
     console.log(`Worker process is running on process ID ${process.pid}`);

     const server = http.createServer((req, res) => {
       res.writeHead(200);
       res.end('Hello, Node.js Cluster!\n');
     });

     server.listen(8000);
   }
