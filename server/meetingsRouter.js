const express = require('express')
const meetingsRouter = express.Router()

//Import DB helper functions
const db = require('./db')

meetingsRouter.get('/', (req, res, next) => {
  const allMeetings = db.getAllFromDatabase('meetings')
  res.send(allMeetings)
})

meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = db.createMeeting()
  const returnedMeeting = db.addToDatabase('meetings', newMeeting)
  res.status(201).send(returnedMeeting)
})

meetingsRouter.delete('/', (req, res, next) => {
  const currentMeetings = db.deleteAllFromDatabase('meetings')
  res.status(204).send(currentMeetings)
})

module.exports = meetingsRouter