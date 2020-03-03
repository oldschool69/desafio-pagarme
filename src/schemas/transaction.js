const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  amount: Joi.number(),
  description: Joi.string(),
  payment_method: Joi.string(),
  card_number: Joi.string().creditCard(),
  card_holder_name: Joi.string(),
  card_expiration_date: Joi.string(),
  card_cvv: Joi.string(),
  client_id: Joi.number(),
})

module.exports = schema
