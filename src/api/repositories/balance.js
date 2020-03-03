const Transaction = require('../../database/models/transaction')
const Payable = require('../../database/models/payable')

/**
 * @param {*} clientId
 * @param {*} query
 */
const getPayablesAndItsTransactions = (clientId, query) => Payable.findAll({
  include: [{
    model: Transaction,
    where: {
      client_id: clientId,
      ...query,
    },
  }],
})

module.exports = {
  getPayablesAndItsTransactions,
}
