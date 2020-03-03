const service = require('../services/balance')
const resolverGeneral = require('../resolvers/general')
const { sendResponse } = require('../commom/http')

const find = async ({ client, query }, res) => {
  const { success, balance } = await service.getBalance(client.id, query)

  if (!success) {
    const { status, json } = resolverGeneral.internalServerError()
    return sendResponse(res, status, json)
  }

  const { status, json } = resolverGeneral.okRequest(balance)
  return sendResponse(res, status, json)
}

module.exports = {
  find,
}
