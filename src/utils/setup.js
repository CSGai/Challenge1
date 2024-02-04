function routerSetup(){
    const controller = require('../controllers/webControllers');
    const { Router } = require('express');
    const router = Router();

    return {'controller': controller, 'router': router}
}
function backendSetup(){
    
    const express = require('express');
    const apiRoutes = require('../routes/apiRoutes');
    const webRoutes = require('../routes/mainPage');

    const backend = express();

    return {'app': backend, 'api': apiRoutes, 'webdir': webRoutes, 'express': express};
}

module.exports = {
    backendSetup,
    routerSetup
}