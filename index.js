//https://github.com/axios/axios
const axios = require('axios');
const files = require('glstools').files;

const authToken = files.read('./ebaytoken.txt').trim();

async function ebayCategoryTree$() {
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
        console.error(error);
    }
}

async function ebaySearch$(categoryId, query, start=0, limit=100) {
    const url = `https://api.ebay.com/buy/browse/v1/item_summary/search`;
    const request = {
        method: 'get',
        url: url,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        params: {
            q: query,
            category_ids: categoryId,
            limit: limit,
            offset: start
            //offset: 101,
        },
    };
    try {
        //console.log(request);
        const instance = axios.create(request);
        const response = await instance.request(request);
        if (!response.data) {
            console.error(response);
            return {itemSummaries: []};
        }
        return response.data;
    } catch (error) {
        console.error(error.response);
        return {itemSummaries: []};
    }
}

async function ebayGroup$(url) {
    const request = {
        method: 'get',
        url: url,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
    try {
        //console.log(request);
        const instance = axios.create(request);
        const response = await instance.request(request);
        if (!response.data) {
            // console.error(response);
            return {itemSummaries: []};
        }
        return response.data;
    } catch (error) {
        console.error(error.response);
        return {itemSummaries: []};
    }
}

async function ebayFeed$(categoryId) {
    const url = `https://api.ebay.com/buy/feed/v1_beta/item?feed_scope=&category_id=625`;
    const request = {
        method: 'get',
        url: url,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        params: {
            feed_scope: 'ALL_ACTIVE',
            categoryId: categoryId,
        },
    };
    try {
        //console.error(request);
        const instance = axios.create(request);
        const response = await instance.request(request);
        //console.error(JSON.stringify(response.data));
    } catch (error) {
        console.error(JSON.stringify(error.response.data));
    }
}

async function main$() {
    let getEbaySummariesFname = process.argv[2];
    let getEbaySummaries$ = require(getEbaySummariesFname);
    let results = [];
    let start = 0;
    let count = 100;
    let max = 10000;
    for(let start = 0; results.length < max; start += count) {
        // console.error(start);
        let items = await getEbaySummaries$(start,count, ebaySearch$, ebayGroup$);
        // console.error(ipads.length);
        if (!items || items.length === 0) break;
        results = results.concat(items);
        start += count;
        console.error(results.length);
    }
    console.log(results.join('\n'));
}

main$();
