// Description:
//   Hubot script para mostrar el valor reciente del Bitcoin desde SURBTC.cl
//
// Dependencies:
//   numberToCLPFormater
//
// Configuration:
//   None
//
// Commands:
//   hubot surbtc bitcoin | btc
//   hubot surbtc ethereum | eth
//   hubot surbtc bitcoin-cash | bch
//
// Author:
//   @juanbrujo

const number = require('numbertoclpformater').numberToCLPFormater

module.exports = (robot) => {

  let surbtcRequest = (coin, msg) => {
    let market

    if (coin=='bitcoin' || coin=='btc') {
      market = 'btc-clp'
    } else if (coin=='ethereum' || coin=='eth') {
      market = 'eth-clp'
    } else if (coin=='bitcoin-cash' || coin=='bch' || coin=='bitcoincash') {
      market = 'bch-clp'
    } else {
      msg.send('Esa no es una cripto-moneda válida.')
      return false
    }

    let url = `https://www.surbtc.com/api/v2/markets/${market}/ticker.json`

    msg.http(url).get()(function(err, res, body) {
      if (err) {
        msg.send('Algo pasó, intente nuevamente.')
      } else {
        res.setEncoding('utf-8')
        let data = JSON.parse(body)
        if (data.ticker.last_price[0]) {
          let formatNumb = number(data.ticker.last_price[0], 'CLP $')
          msg.send( `1 ${coin} está a ${formatNumb} en SURBTC` )
        } else {
          robot.logger.error(data)
          msg.send(`${data.message} error :ql: !`)
        }
      }
    })
  }

  robot.respond(/surbtc (.*)/i, (msg) => {
    let coin = msg.match[1]
    msg.send('Consultando último valor con SURBTC... :clock5:')
    surbtcRequest(coin,msg)
  })
}