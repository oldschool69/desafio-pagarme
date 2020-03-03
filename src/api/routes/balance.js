const express = require('express')
const Controller = require('../controllers/balance')
const authMiddleware = require('../../middlewares/auth')

const router = express.Router()

router
  .route('/balance')

  // GET /api/v1/balance?clientId= - Obtém saldo para transacoes com a clientId
  .get(authMiddleware, Controller.find)

module.exports = router
