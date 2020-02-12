const express = require('express');
const helmet = require('helmet');
const userRouter = require('./users/userRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/api/user', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
    next();
}

module.exports = server;
