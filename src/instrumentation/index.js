/* eslint-disable global-require */
const { blue, green } = require('../util/chalk')
const { errorHandling } = require('../api/commom/error')

const loadEnvironmentVariables = () => require('./environment')

const initializePostgres = () => require('../database/postgres')
  .sync({ force: true })

const initialize = async (type) => {
  try {
    blue(`Initializing: ${type}...`)
    loadEnvironmentVariables()
    green('Carregada variaveis do .env 👍')
    await initializePostgres()
    green('Estabelecida conexao com Postgres 🤙')
  } catch (error) {
    errorHandling(error)
  }
}

module.exports = {
  initialize,
}
