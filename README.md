# Desafio Code Review Pagar.me (v1.0)

Em programação investimos mais tempo lendo código (para review, entender o que está sendo feita, argumentar, etc) do que escrevendo.

No Pagar.me, é comum ter diversos times e pessoas colocando código em produção constantemente e uma coisa que está no nosso dia-a-dia é Code Review.

Nesse desafio, queremos que você faça o Code Review de uma implementação que alguma outra pessoa do time quer colocar em produção. Para você ter uma experiência o mais parecida possível com o nosso dia-a-dia, criamos esse repositório vazio com um Pull Request aberto para você revisar através da interface do Github.

> Importante: Leia com atenção o Contexto, os Requisitos e o Formato de Avaliação

## Contexto

Em sua essência um PSP tem duas funções muito importantes:

1. Permitir que nossos clientes processem transações ("cash-in")
2. Efetuar os pagamentos dos recebíveis para os nossos clientes ("cash-out")

No Pagar.me, nós temos duas entidades que representam essas informações:

* `transactions`: que representam as informações da compra, dados do cartão, valor, etc
* `payables`: que representam os recebíveis que pagaremos ao cliente

> Nota: quando um cliente passa uma transação de crédito, ele normalmente recebe o valor em média apenas 30 dias depois (o que chamamos de D+30), porque é assim que a cadeia financeira (bancos, bandeiras, adquirentes) funciona. Porém é possível receber esse valor antes dos 30 dias através de um mecanismo chamado "antecipação". Se tiver curiosidade, a gente tem artigo que explica sobre isso, mas isso não é necessário para realizar esse desafio: https://pagarme.zendesk.com/hc/pt-br/articles/217029766-O-que-%C3%A9-antecipa%C3%A7%C3%A3o-

## Requisitos

Abaixo estão as regras de negócio da implementação que foi feita. Você deve usar isso como base para entender se implementação faz o que deveria da maneira correta.

1. O serviço deve processar transações, recebendo as seguintes informações:
    * Valor da transação
    * Descrição da transação. Ex: `'Smartband XYZ 3.0'`
    * Método de pagamento (`debit_card` ou `credit_card`)
    * Número do cartão
    * Nome do portador do cartão
    * Data de validade do cartão
    * Código de verificação do cartão (CVV)
2. O serviço deve retornar uma lista das transações já criadas
3. Como o número do cartão é uma informação sensível, o serviço só pode armazenar e retornar os 4 últimos dígitos do cartão.
4. O serviço deve criar os recebíveis do cliente (`payables`), com as seguintes regras:
    * Se a transação for feita com um cartão de débito:
    * O payable deve ser criado com status = `paid` (indicando que o cliente já recebeu esse valor)
    * O payable deve ser criado com a data de pagamento (payment_date) = data da criação da transação (D+0).
    * Se a transação for feita com um cartão de crédito:
    * O payable deve ser criado com status = `waiting_funds` (indicando que o cliente vai receber esse dinheiro no futuro)
    * O payable deve ser criado com a data de pagamento (payment_date) = data da criação da transação + 30 dias (D+30).
5. No momento de criação dos payables também deve ser descontado a taxa de processamento (que chamamos de `fee`) do cliente. Ex: se a taxa for 5% e o cliente processar uma transação de R$100,00, ele só receberá R$95,00. Considere as seguintes taxas:
    * 3% para transações feitas com um cartão de débito
    * 5% para transações feitas com um cartão de crédito
6. O serviço deve prover um meio de consulta para que o cliente visualize seu saldo com as seguintes informações:
    * Saldo `available` (disponível): tudo que o cliente já recebeu (payables `paid`)
    * Saldo `waiting_funds` (a receber): tudo que o cliente tem a receber (payables `waiting_funds`)


## Instruções

1. Faça o review através do "Pull Request" que se encontra nesse repositório. É bem intuitivo, mas caso tenha dúvidas de como fazer isso, você pode consultar o link: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-reviews
2. Considere para fins do desafio que este é um código que vai ser colocado em produção e impactar milhares de clientes, então coloque no review o máximo dessa importância.
3. Considere que você está fazendo o review do código de uma pessoa do seu time e se comunique como você se comunicaria nessa situação.
4. Você pode sugerir soluções para os problemas que você encontrar nos comentários do review.

## Avaliação

1. Vamos te chamar para conversar e discutir sobre o seu code review. Você não precisa preparar nenhuma apresentação, mas sinta-se livre caso queira trazer algo a mais.
2. Iremos discutir sobre os pontos que você anotou no review e se aprofundar em alguns pontos específicos.
3. Vamos aproveitar o contexto do desafio para discutir possíveis cenários alternativos, pontos de melhoria que você enxergou, como você faria determinados pontos diferentes, etc.
4. Você não vai ser avaliado por anotar todos os erros. Esse desafio não tem gabarito. Queremos entender quais são os pontos que você acha importante e que não deixaria passar em um cenário real.
5. Lembre que isso vai ser uma troca e que deveria ser uma experiência de aprendizado para os dois lados.
6. Boa sorte :)
