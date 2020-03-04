/* eslint-disable linebreak-style */
const R = require('ramda')
const moment = require('moment')
const feeService = require('./fee')

const getInfoBasedOnPaymentType = (type) => {
  switch (type) {
    case 'credit_card': {
      return {
        status: 'waiting_funds',
        days: 30,
      }
    }
    case 'debit_card': {
      return {
        status: 'paid',
        days: 0,
      }
    }
    default:
      return false
  }
}

const addDaysToActualDate = days => moment().add(days, 'days').toDate()

const getPaymentDate = (paymentType) => {

  console.log('***paymentType: ', paymentType)

  const { days } = getInfoBasedOnPaymentType(paymentType)

  if (days === undefined) {
    throw new Error('Invalid parameter')
  }

  console.log('***days: ', days)

  const paymentDate = addDaysToActualDate(days)

  console.log('***paymentDate: ', paymentDate)

  return paymentDate
}

const createPaymentDate = (paymentType) => {
  const paymentDate = getPaymentDate(paymentType)

  return paymentDate
}

const producePayableObject = async (transaction) => {
  const amount = R.prop('amount')(transaction)
  const paymentType = R.prop('payment_method')(transaction)

  const fee = await feeService.getFeeAmount(amount, paymentType)
  const paymentDate = createPaymentDate(paymentType)
  const { status } = getInfoBasedOnPaymentType(paymentType)

  return {
    fee,
    payment_date: paymentDate,
    status,
  }
}

const createPayableObject = transaction => producePayableObject(transaction)

module.exports = {
  createPayableObject,
}
