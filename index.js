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

async function ebaySearch(categoryId, query, start, limit) {
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
            console.log(response);
            return {itemSummaries: []};
        }
        return response.data;
    } catch (error) {
        console.log(error.response);
        return {itemSummaries: []};
    }
}
async function ebayFeed(categoryId) {
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
        console.log(request);
        const instance = axios.create(request);
        const response = await instance.request(request);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.log(JSON.stringify(error.response);
    }
}


async function getIpadSummaries() {
    const tabletCategory = `58058`;
    let data = await ebaySearch(tabletCategory, 'ipad');
    // console.log(data);
    data.itemSummaries.forEach(item => {
        // console.log(JSON.stringify(item, null, 2));
        if (item.itemGroupType) {
            // console.log(`**${item.title}`);
            // console.log(`  ${item.buyingOptions[0]} ${item.price.value} ${item.condition} ${item.color}`);
        } else {
            console.log(`${item.title}`);
            console.log(`  ${item.buyingOptions[0]} ${item.price.value} ${item.condition} ${item.color}`);
        }
    });
}

async function main() {
    const tabletCategory = `58058`;
    ebayFeed(tabletCategory);
}

main();
