const express = require('express')
const Controller = require('../controllers/transaction')

const router = express.Router()

router
  .route('/new-transaction')
  .post(Controller.create)

router
  .route('/transactions')
  .get(Controller.findAll)

router
  .route('/transactions/:id')
  .get(Controller.find)

module.exports = router
