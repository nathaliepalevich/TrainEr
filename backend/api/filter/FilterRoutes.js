const express = require('express')
const { getfilter } = require('./filterController')
const router = express.Router()



router.get('/getfilter', getfilter)

module.exports = router