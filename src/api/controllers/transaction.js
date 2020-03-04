/* eslint-disable */
const service = require('../services/transaction')
const resolver = require('../resolvers/transaction')
const resolverGeneral = require('../resolvers/general')
const { sendResponse } = require('../commom/http')

const findAll = async (req, res) => {
  const transactions = await service.findAll()

  const { status, json } = resolver.findAll(transactions)

  return sendResponse(res, status, json)
}

const create = async ({ body }, res) => {
  const { card_number } = body

  const { isValid, message } = service.isValidRequest(body)

  console.log('***isValid: ', isValid, " message: ", message);

  if (!isValid) {
    const { status, json } = resolverGeneral.invalidRequest(message)
    return sendResponse(res, status, json)
  }

  const {
    isCredCardValid,
    company,
  } = service.creditCardValid(card_number)

  console.log('*** isCredCardValid: ', isCredCardValid);

  if (!isCredCardValid) {
    console.log(isCredCardValid)
    const { status, json } = resolverGeneral.invalidCreditCard()
    return sendResponse(res, status, json)
  }

  const { created, transactionCreated } = await service
    .create(body, company)

  if (!created) {
    const { status, json } = resolverGeneral.internalServerError()
    return sendResponse(res, status, json)
  }

  const { status, json } = resolver.created(transactionCreated)

  return sendResponse(res, status, json)
}

const find = async ({ params }, res) => {
  console.log(params)
  const { id } = params
  const transaction = await service.find(id)

  const { status, json } = resolver.find(transaction)

  return sendResponse(res, status, json)
}

module.exports = {
  findAll,
  create,
  find,
}
