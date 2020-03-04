/* eslint-disable linebreak-style */
const R = require('ramda')
const repository = require('../repositories/transaction')
const schemaTransactionRequest = require('../../schemas/transaction')
const { validateRequestBasedOnSchema, validateCreditCardNumber } = require('../commom/validation')
const payableService = require('./payable')
const { errorHandling } = require('../commom/error')

const findAll = async () => {
  const transactions = await repository.findAll()

  return transactions
}

const creditCardCompanyPath = R.path(['card', 'type'])

const getCreditCardCompany = cardObject => creditCardCompanyPath(cardObject)

const parseCreditCardNumber = transaction => R.evolve(
  { card_number: R.takeLast(4) },
  transaction
)

const renameCreditCardKey = (transaction) => {
  const keyRenamed = R.assoc(
    'card_last_digits',
    R.prop('card_number')(transaction),
    transaction
  )

  const oldKeyRemoved = R.omit(['card_number'])(keyRenamed)

  return oldKeyRemoved
}

const addCreditCardCompany = (transaction, company) => R.assoc(
  'card_brand',
  company,
  transaction
)

const createTransactionObjectToInsert = (transaction, company) => {
  const creditCardParsed = parseCreditCardNumber(transaction)

  const creditCardKeyRenamed = renameCreditCardKey(creditCardParsed)

  const finalObject = addCreditCardCompany(creditCardKeyRenamed, company)

  return finalObject
}

const create = async (transaction, creditCardCompany) => {
  let created = true; let transactionCreated

  try {
    const transactionObject = createTransactionObjectToInsert(
      transaction,
      creditCardCompany
    )

    const payableObject = await payableService
      .createPayableObject(transactionObject)

    // Criacao da transacao e do payable
    transactionCreated = await repository
      .create(transactionObject, payableObject)
  } catch (error) {
    console.error('*** Error on transaction ===> ', error);
    [created, transactionCreated] = [false, {}]
    errorHandling(error)
  }

  return { created, transactionCreated }
}

const getErrorMessage = validation => R.pipe(
  R.path(['error', 'details']),
  R.head(),
  R.prop('message')
)(validation)

const getErrorMessageFromValidation = validation => getErrorMessage(validation)

const isValidRequest = (transaction) => {
  const validation = validateRequestBasedOnSchema(
    transaction,
    schemaTransactionRequest
  )

  const isValid = !validation.error
  const message = isValid ? null : getErrorMessageFromValidation(validation)

  return { isValid, message }
}

const creditCardValid = (creditCardNumber) => {
  const creditCardValidation = validateCreditCardNumber(creditCardNumber)

  const { isValid } = creditCardValidation

  const creditCardCompany = getCreditCardCompany(creditCardValidation)

  return {
    isCredCardValid: isValid,
    company: creditCardCompany,
  }
}

const find = async (id) => {
  let transaction
  try {
    transaction = await repository.find(id)
  } catch (error) {
    errorHandling(error)
  }

  return transaction
}

module.exports = {
  findAll,
  create,
  isValidRequest,
  creditCardValid,
  find,
}
