const axios = require('axios');

axios
  .get(
    'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD'
  )
  .then(function(response) {
    console.log(response.data.RAW.BTC.USD);
    console.log(response.data.DISPLAY.BTC.USD);
  })
  .catch(function(error) {
    console.log(error);
  });
