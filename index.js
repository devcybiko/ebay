const axios = require('axios');

let url = `https://api.ebay.com/buy/browse/v1/item_summary/search`;
axios.get(url)
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });
