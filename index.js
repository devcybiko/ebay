const axios = require('axios');
//https://github.com/axios/axios

const request = {
    method: 'get',
    url: `https://api.ebay.com/buy/browse/v1/item_summary/search`,
    headers: {
        Authorization: `Bearer GregoryS-agilefro-SBX-ea5837354-ee692225`,
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
instance
    .then(response => {
        console.log(response.data.url);
        console.log(response.data.explanation);
    })
    .catch(error => {
        console.log(error);
    });