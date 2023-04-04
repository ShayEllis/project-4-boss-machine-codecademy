const express = require('express')
const meetingsRouter = express.Router()

//Import DB helper functions
const db = require('./db')

meetingsRouter.get('/', (req, res, next) => {
  const allMeetings = db.getAllFromDatabase('meetings')
  res.send(allMeetings)
})

/*

Meeting
time: string
date: JS Date object
day: string
note: string

*/

meetingsRouter.post('/', (req, res, next) => {
  // No request body is necessary, meetings are generated automatically
  // use createMeeting function exproted from db.js

  // create a new meeting and save it to the database
})

meetingsRouter.delete('/', (req, res, next) => {
  // delete all meetings from the database
})

module.exports = meetingsRouter