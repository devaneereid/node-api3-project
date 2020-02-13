// code away!
require('dotenv').config();

const express = require('express');

const server = require('./server.js');

server.use(express.json());

const port = process.env.PORT || 6000;

server.listen(port, () => {
    console.log(`\n* Server Running on ${port} *\n`);
});
