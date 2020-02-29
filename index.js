//https://github.com/axios/axios
const axios = require('axios');
const files = require('glstools').files;

const authToken = files.read('./ebaytoken.txt').trim();
const url2 = `https://api.ebay.com/commerce/taxonomy/v1_beta/get_default_category_tree_id?marketplace_id=EBAY_US`;
const url4 = `https://api.ebay.com/buy/browse/v1/item/get_items_by_item_group?item_group_id=184057411986`;
const url5 = `https://api.ebay.com/commerce/taxonomy/v1_beta/category_tree/0/get_category_subtree?category_id=58058`;

async function ebayCategoryTree() {
    const url = `https://api.ebay.com/commerce/taxonomy/v1_beta/category_tree/0`;
    const request = {
        method: 'get',
        url: url,
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    }
    try {
        const instance = axios.create(request);
        const response = await instance.request(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function ebaySearch(categoryId, query) {
    // https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=20863&limit=3
    const url = `https://api.ebay.com/buy/browse/v1/item_summary/search`;
    const request = {
        method: 'get',
        url: url,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
    const params = {
        category_ids: `20863`,
        limit: 10,
    }
    try {
        console.log(request);
        const instance = axios.create(request);
        const response = await instance.request(params);
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}

function ebay() {
    const request = {
        method: 'get',
        url: url5,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },

        // `params` are the URL parameters to be sent with the request
        // Must be a plain object or a URLSearchParams object
        params: {
            category_ids: tabletCategory,
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
}

async function main() {
    // let tree = await ebayCategoryTree();
    // console.log(JSON.stringify(tree, null, 2));
    // return;
    const tabletCategory = `58058`;
    let data = await ebaySearch(tabletCategory, 'ipad');
    console.log(JSON.stringify(data, null, 2));
}

main();
