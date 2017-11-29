'use strict'

var hippie = require('hippie');

hippie()
  .header("User-Agent", "hippie")
  .json()
  .get('https://www.surbtc.com/api/v2/markets/btc-clp/ticker')
  .expectStatus(200)
  .expectHeader('Content-Type', 'text/html; charset=utf-8')
  .expectKey('ticker.last_price')
  .expectBody(/last_price/g)
  .end(function(err, res, body) {
    if (err) throw err;
    console.log(body);
    process.exit(0);
  });
