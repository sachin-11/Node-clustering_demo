const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; 

console.log(numCPUs);


if (cluster.isMaster) {
  // This code will run only in the master process
  console.log(`Master process is running on process ID ${process.pid}`);

  // Fork worker processes for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker exit events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // This code will run in each worker process
  console.log(`Worker process is running on process ID ${process.pid}`);

  // Create your HTTP server or other application logic here
  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello, Node.js Cluster!\n');
  });

  server.listen(8000);
}