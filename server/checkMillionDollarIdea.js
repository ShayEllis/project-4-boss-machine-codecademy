const checkMillionDollarIdea = (req, res, next) => {
  const idea = req.body
  idea.weeklyRevenue = Number(req.body.weeklyRevenue)
  idea.numWeeks = Number(req.body.numWeeks)
  try {
    if (idea.weeklyRevenue && idea.numWeeks) {
      const ideaValue = idea.weeklyRevenue * idea.numWeeks
      if (ideaValue >= 1000000) {
        req.idea = idea
        next()
      } else {
        throw new Error('Not a million dollar idea!')
      }
    } else {
      throw new Error('Invalid weekly revenue or number of weeks!')
    }
  } catch (err) {
    res.status(400).send(err.message)
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
