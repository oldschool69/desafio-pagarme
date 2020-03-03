const request = require('supertest')
const app = require('../../src/server/server')

module.exports = request(app)
