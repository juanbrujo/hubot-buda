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
//   hubot surbtc bitcoin
//   hubot surbtc ethereum
//
// Author:
//   @juanbrujo

const number = require('numbertoclpformater').numberToCLPFormater

module.exports = (robot) => {

  let surbtcRequest = (coin, msg) => {
    let market
    switch(coin){
      case 'bitcoin':
        market = 'btc-clp'
        break
      case 'ethereum':
        market = 'eth-clp'
        break
    }
    let url = `https://www.surbtc.com/api/v2/markets/${market}/ticker.json`

    msg.http(url).get()(function(err, res, body) {
      if (err) {
        msg.send('Algo pasó, intente nuevamente.')
      } else {
        res.setEncoding('utf-8')
        let data = JSON.parse(body)
        if (data) {
          let formatNumb = number(data.ticker.last_price[0], 'CLP$ ')
          msg.send( `1 ${coin} está a ${formatNumb} en SURBTC` )
        } else {
          msg.send('Error :ql: !')
        }
      }
    })
  }

  robot.respond(/surbtc ethereum/i, (msg) => {

    msg.send('Consultando último valor con SURBTC... :clock5:')
    surbtcRequest('ethereum',msg)

  })

  robot.respond(/surbtc bitcoin/i, (msg) => {

    msg.send('Consultando último valor con SURBTC... :clock5:')
    surbtcRequest('bitcoin',msg)

  })

}
