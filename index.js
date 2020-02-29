//https://github.com/axios/axios
const axios = require('axios');
const files = require('glstools').files;

const authToken = files.read('./ebaytoken.txt').trim();
const request = {
    method: 'get',
    url: `https://api.ebay.com/buy/browse/v1/item_summary/search`,
    headers: {
        Authorization: `Bearer ${authToken}`,
    },

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params: {
        category_ids: `108765`,
        q: `Beatles`,
        filter: `price:[200..500]&fileter==priceCurrency:USD`,
        limit: `10`
    },
    timeout: 1000, // default is `0` (no timeout)
    responseType: 'json', // default
    responseEncoding: 'utf8', // default
    maxContentLength: 2000,
};
const instance = axios.create(request);
instance.request()
    .then(response => {
        console.log(response.data.url);
        console.log(response.data.explanation);
        console.log("SUCCESS");
    })
    .catch(error => {
        console.log(error.response.data);
        console.log("ERROR");
    });