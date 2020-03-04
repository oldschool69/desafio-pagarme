const testServer = require('./testServer')

describe('Server', () => {
  it('POST /transactions should respond with 200', async () => {
    const response = await testServer.post('/api/v1/new-transaction')
      .send({
        amount: 20896.50,
        description: 'Transação de compra de carro',
        payment_method: 'credit_card',
        card_number: '4242424242424242',
        card_holder_name: 'Eu, eu mesmo e Irene',
        card_expiration_date: 'meu aniversário',
        card_cvv: 'cvc',
        client_id: 11,
      })

    expect(response.statusCode).toBe(200)
  })

  it.skip('POST /transactions should respond with error 400', async () => {
    const response = await testServer.post('/api/v1/new-transaction')
      .send({
        amount: 1800.05,
        description: 'Transação de compra de carro',
        payment_method: 'cartao de credito',
        card_number: '4242424242424242',
        card_holder_name: 'Eu, eu mesmo e Irene',
        card_expiration_date: 'meu aniversário',
        card_cvv: 'cvc',
        client_id: 9999999999999999999999999,
      })

    expect(response.statusCode).toBe(400)
  })

  it.skip('POST /transactions should respond with error 500', async () => {
    const response = await testServer.post('/api/v1/new-transaction')
      .send({
        amount: 680.45,
        description: 'Transação de compra de carro',
        payment_method: 'cartao de credito',
        card_number: '4242424242424242',
        card_holder_name: 'Eu, eu mesmo e Irene',
        card_expiration_date: 'meu aniversário',
        card_cvv: 'cvc',
        client_id: Number.MAX_SAFE_INTEGER,
      })

    expect(response.statusCode).toBe(500)
  })
})
