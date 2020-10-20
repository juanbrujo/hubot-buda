'use strict'

const hippie = require('hippie')

hippie()
  .header('User-Agent', 'hippie')
  .json()
  .get('https://www.buda.com/api/v2/markets/btc-clp/ticker')
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json; charset=utf-8')
  .expectKey('ticker.last_price')
  .expectBody(/last_price/g)
  .end(function(err, res, body) {
    if (err) throw err
    console.log(body)
    process.exit(0)
  })
