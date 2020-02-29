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

async function ebaySearch(categoryId, query, start=0, limit=100) {
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
        console.log(JSON.stringify(error.response.data));
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
            // console.log(`${item.title}`);
            // console.log(`  ${item.buyingOptions[0]} ${item.price.value} ${item.condition} ${item.color}`);
            console.log(item.title);
            let gen = item.title.match(/ (\d(st|th|nd|rd)) [Gg]en/);
            if (gen) console.log(gen[1])
            let gb = item.title.match(/\d+GB/);
            if (gb) console.log(gb[0]);
            let style = item.title.match(/pro|mini|air|mini/i);
            if (style) console.log(style[0]);
            let size = item.title.match(/(\d+([.]\d)?) ?(\"|inch|in)/i);
            if (size) console.log(size[1]);
            let color = item.title.match(/gold|silver|gray|grey|black/i);
            if (color) console.log(color[0]);
            let wifi = item.title.match(/wi-fi|wifi/i);
            if (wifi) console.log(wifi[0]);
            let cellular = item.title.match(/sprint|verizon|4g|lte|cellular/i);
            if (cellular) console.log(cellular[0]);
            let unlocked = item.title.match(/unlocked/i);
            if (unlocked) console.log(unlocked[0]);
            let model = item.title.match(/M.*\/A/);
            if (model) console.log(model[0]);

        }
    });
}

async function main() {
    getIpadSummaries();
}

main();
