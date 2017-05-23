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
//
// Author:
//   @juanbrujo

const number = require('numbertoclpformater').numberToCLPFormater;

module.exports = function(robot) {

  return robot.respond(/surbtc bitcoin/i, function(msg) {

    msg.send('Consultando último valor con SURBTC... :clock5:');

    const url = `https://www.surbtc.com/api/v2/markets/btc-clp/ticker`;

    return msg.http(url).get()(function(err, res, body) {
      if (err) {
        msg.send('Algo pasó, intente nuevamente.');
      } else {
        res.setEncoding('utf-8');
        let data = JSON.parse(body);
        if (data) {
          let formatNumb = number(data.ticker.last_price[0], 'CLP$ ');
          msg.send( `1 bitcoin está a ${formatNumb} en SURBTC` );
        } else {
          msg.send('Error :ql: !');
        }
      }
    });
    
  });

};
