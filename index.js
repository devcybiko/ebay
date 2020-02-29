//https://github.com/axios/axios
const axios = require('axios');
const files = require('glstools').files;

const authToken = files.read('./ebaytoken.txt').trim();
const url = `https://api.ebay.com/commerce/taxonomy/v1_beta/category_tree/0`;
const url2 = `https://api.ebay.com/commerce/taxonomy/v1_beta/get_default_category_tree_id?marketplace_id=EBAY_US`;
const url3 = `https://api.ebay.com/buy/browse/v1/item_summary/search?filter=priceCurrency:USD`;
const request = {
    method: 'get',
    url: url3,
    headers: {
        Authorization: `Bearer ${authToken}`,
    },

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params: {
        category_ids: `58058`,
        q: `ipad`,
        // filter: `price:[200..500]`, 
        // limit: `10`

    },

    timeout: 1000, // default is `0` (no timeout)
    responseType: 'json', // default
    responseEncoding: 'utf8', // default
    //maxContentLength: 20000,
};
const instance = axios.create(request);
instance.request(request)
    .then(response => {
        console.log(JSON.stringify(response.data, null, 2));
        console.log("SUCCESS");
    })
    .catch(error => {
        console.log(error);
        // console.log(error.config);
        // console.log(error.response);
        console.log("ERROR");
    });