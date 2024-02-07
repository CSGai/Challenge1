const { backendSetup } = require('./src/utils/setup.js');
const { testDB } = require('./src/services/mongoDB/mongoDB.js');
require('dotenv/config.js');

setup = backendSetup();

const directories = setup['webdir'];
const express = setup['express'];
const api = setup['api'];
const backend = setup['app'];
var port = process.env.PORT;

backend.use(express.json());
backend.use('/api', api);
backend.use('/', directories);

backend.listen(port, (error) =>{
    if(!error && port != undefined){
        console.log("Server is Up and Running on Port " + port);
    }
    else{
        console.log("Error occured during startup...", error);
    }
});