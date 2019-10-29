const FilterService = require('./FilterService')

module.exports = {
     getfilter
}

async function getfilter(req, res) {
     const lessons = await FilterService.getfilter()
   res.send(lessons)
}

