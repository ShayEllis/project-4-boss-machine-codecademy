const express = require('express');
const apiRouter = express.Router();

//Import and use routers:
const ideasRouter = require('./ideasRouter')
apiRouter.use('/ideas', ideasRouter)
const meetingsRouter = require('./meetingsRouter')
apiRouter.use('/meetings', meetingsRouter)
const minionsRouter = require('./minionsRouter')
apiRouter.use('/minions', minionsRouter)

module.exports = apiRouter;
