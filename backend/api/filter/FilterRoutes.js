const express = require('express')
const { getfilter } = require('./FilterController')
const router = express.Router()



router.get('/getfilter', getfilter)

module.exports = router