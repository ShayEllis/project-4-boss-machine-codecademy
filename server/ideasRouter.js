const express = require('express')
const ideasRouter = express.Router()

//Import DB helper functions
const db = require('./db')

ideasRouter.get('/', (req, res, next) => {
  const allIdeas = db.getAllFromDatabase('ideas')
  res.send(allIdeas)
})

ideasRouter.post('/', (req, res, next) => {
  try {
    const returnedIdea = db.addToDatabase('ideas', req.body)
    if (returnedIdea) {
      res.status(201).send(returnedIdea)
    }
  } catch (err) {
    err.status = 404
    next(err)
  }
})

ideasRouter.param('ideaId', (req, res, next, id) => {
  try {
    const ideaExists = db.getFromDatabaseById('ideas', id)
    if (!ideaExists) {
      throw new Error(`No idea found with id: ${id}`)
    } else {
      req.ideaId = id
      next()
    }
  } catch (err) {
    err.status = 404
    next(err)
  }
})

ideasRouter.get('/:ideaId', (req, res, next) => {
  selectedIdea = db.getFromDatabaseById('ideas', req.ideaId)
  res.status(200).send(selectedIdea)
})

ideasRouter.put('/:ideaId', (req, res, next) => {
  try {
    let updatedIdea = db.updateInstanceInDatabase('ideas', req.body)
    if (updatedIdea) {
      res.status(200).send(updatedIdea)
    }
  } catch (err) {
    err.status = 404
    next(err)
  }
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
  db.deleteFromDatabasebyId('ideas', req.ideaId)
  res.sendStatus(204)
})

module.exports = ideasRouter