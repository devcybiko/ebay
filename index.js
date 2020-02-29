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
            limit: 100,
            fieldgroups: "ASPECT_REFINEMENTS,CATEGORY_REFINEMENTS,CONDITION_REFINEMENTS,BUYING_OPTION_REFINEMENTS",

            //offset: 101,
        },
    };
    try {
        //console.log(request);
        const instance = axios.create(request);
        const response = await instance.request(request);
        if (!response.data) {
            console.log(response);
            return [];
        }
        return response.data;
    } catch (error) {
        console.log(error.response);
        return 
    }
}


async function main() {
    // let tree = await ebayCategoryTree();
    // console.log(JSON.stringify(tree, null, 2));
    // return;
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

main();
