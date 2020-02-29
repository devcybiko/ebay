//https://github.com/axios/axios
const axios = require('axios');
const files = require('glstools').files;

const authToken = files.read('./ebaytoken.txt').trim();
const url1 = `https://api.ebay.com/commerce/taxonomy/v1_beta/category_tree/0`;
const url2 = `https://api.ebay.com/commerce/taxonomy/v1_beta/get_default_category_tree_id?marketplace_id=EBAY_US`;
const url3 = `https://api.ebay.com/buy/browse/v1/item_summary/search?filter=priceCurrency:USD`;
const url4 = `https://api.ebay.com/buy/browse/v1/item/get_items_by_item_group?item_group_id=184057411986`;
const tableCategory = `58058`;

const request = {
    method: 'get',
    url: url1,
    headers: {
        Authorization: `Bearer ${authToken}`,
    },

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params: {
        category_ids: tableCategory,
        q: `ipad`,
        // filter: `price:[200..500]`, 
        limit: `100`,

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
        response.data.items.forEach(item => {
            console.log(item.title);
            console.log(`${item.price.value} ${item.condition} ${item.color} ${item.localizedAspects[0].value}`);
        });
        console.log("SUCCESS");
    })
    .catch(error => {
        console.log(error);
        // console.log(error.config);
        // console.log(error.response);
        console.log("ERROR");
    });