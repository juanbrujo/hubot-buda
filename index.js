// Description:
//   Hubot script para mostrar el valor reciente de cripto-monedas desde buda.com en pesos chilenos
//
// Dependencies:
//   numberToCLPFormater
//
// Configuration:
//   None
//
// Commands:
//   hubot buda bitcoin | btc
//   hubot buda ethereum | eth
//   hubot buda bitcoin-cash | bch
//
// Author:
//   @juanbrujo

const number = require('numbertoclpformater').numberToCLPFormater

module.exports = (robot) => {
  const budaRequest = (coin, msg) => {
    let market

    if (coin == 'bitcoin' || coin == 'btc') {
      market = 'btc-clp'
    } else if (coin == 'ethereum' || coin == 'eth') {
      market = 'eth-clp'
    } else if (coin == 'bitcoin-cash' || coin == 'bch' || coin == 'bitcoincash') {
      market = 'bch-clp'
    } else {
      msg.send('Esa no es una cripto-moneda válida.')
      return false
    }

    let url = `https://www.buda.com/api/v2/markets/${market}/ticker.json`

    msg.http(url).get()(function (err, res, body) {
      if (err) msg.send('Algo pasó, intente nuevamente.')
      res.setEncoding('utf-8')
      const data = JSON.parse(body)
      if (data.ticker.last_price[0]) {
        const formatNumb = number(data.ticker.last_price[0], 'CLP $')
        msg.send(`:bitcoin: 1 ${coin} está a ${formatNumb} en BUDA`)
      } else {
        robot.logger.error(data)
        msg.send(`${data.message} error :ql: !`)
      }
    })
  }

  robot.respond(/buda (.*)/i, (msg) => {
    const coin = msg.match[1].toLowerCase()
    msg.send('Consultando último valor en BUDA... :clock5:')
    budaRequest(coin, msg)
  })
}
