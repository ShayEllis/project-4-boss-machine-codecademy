const express = require('express')
const minionsRouter = express.Router()

//Import DB helper functions
const db = require('./db')

minionsRouter.get('/', (req, res, next) => {
  const allMinions = db.getAllFromDatabase('minions')
  res.send(allMinions)
})

minionsRouter.post('/', (req, res, next) => {
  try {
    const returnedMinion = db.addToDatabase('minions', req.body)
    if (returnedMinion) {
      res.status(201).send(returnedMinion)
    }
  } catch (err) {
    err.status = 404
    next(err)
  }
})

minionsRouter.param('minionId', (req, res, next, id) => {
  try {
    const minionExists = db.getFromDatabaseById('minions', id)
    if (!minionExists) {
      throw new Error(`No minion found with id: ${id}`)
    } else {
      req.minionId = id
      next()
    }
  } catch (err) {
    err.status = 404
    next(err)
  }
})

minionsRouter.get('/:minionId', (req, res, next) => {
  selectedMinion = db.getFromDatabaseById('minions', req.minionId)
  res.status(200).send(selectedMinion)
})

minionsRouter.put('/:minionId', (req, res, next) => {
  try {
    let updatedMinion = db.updateInstanceInDatabase('minions', req.body)
    if (updatedMinion) {
      res.status(200).send(updatedMinion)
    }
  } catch (err) {
    err.status = 404
    next(err)
  }
})

minionsRouter.delete('/:minionId', (req, res, next) => {
  db.deleteFromDatabasebyId('minions', req.minionId)
  res.sendStatus(204)
})

module.exports = minionsRouter