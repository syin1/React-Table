const axios = require('axios');
var fs = require('fs');
const XLSX = require('xlsx');
const workbook = XLSX.readFile('Top100Crypto.xlsx');
const sheet_name_list = workbook.SheetNames;

let coinString = '';

XLSX.utils
  .sheet_to_json(workbook.Sheets[sheet_name_list[0]])
  .slice(0, 50)
  .forEach(function(element) {
    coinString = coinString + element.Symbol + ',';
  });

coinString = coinString.substring(0, coinString.length - 1);

coins = coinString.split(',');

var viewData = {
  allCoins: []
};

axios
  .get(
    'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' +
      coinString +
      '&tsyms=USD'
  )
  .then(function(response) {
    for (var i = 0; i < coins.length; i++) {
      // console.log('Name:', coins[i]);
      // console.log(
      //   'Price:',
      //   eval('response.data.DISPLAY.' + coins[i] + '.USD.PRICE')
      // );
      // console.log(
      //   'Change (24H):',
      //   eval('response.data.DISPLAY.' + coins[i] + '.USD.CHANGEPCT24HOUR'),
      //   '%'
      // );
      // console.log(
      //   'Market Cap:',
      //   eval('response.data.DISPLAY.' + coins[i] + '.USD.MKTCAP')
      // );
      // console.log(
      //   'Direct Volume (24H):',
      //   eval('response.data.DISPLAY.' + coins[i] + '.USD.VOLUME24HOURTO')
      // );
      // console.log(
      //   'Total Volume (24H):',
      //   eval('response.data.DISPLAY.' + coins[i] + '.USD.TOTALVOLUME24HTO')
      // );

      var jsonData = {};
      jsonData['id'] = i + 1;
      jsonData['name'] = coins[i];
      jsonData['price'] = eval(
        'response.data.DISPLAY.' + coins[i] + '.USD.PRICE'
      );
      jsonData['change'] =
        eval('response.data.DISPLAY.' + coins[i] + '.USD.CHANGEPCT24HOUR') +
        '%';
      jsonData['marketcap'] = eval(
        'response.data.DISPLAY.' + coins[i] + '.USD.MKTCAP'
      );
      jsonData['dvolume'] = eval(
        'response.data.DISPLAY.' + coins[i] + '.USD.VOLUME24HOURTO'
      );
      jsonData['tvolume'] = eval(
        'response.data.DISPLAY.' + coins[i] + '.USD.TOTALVOLUME24HTO'
      );
      viewData.allCoins.push(jsonData);
    }
  })
  .then(function() {
    fs.writeFile('coins.json', JSON.stringify(viewData), 'utf8', function() {});
  })
  .catch(function(error) {
    console.log(error);
  });
