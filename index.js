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


async function getIpadSummaries(start, limit) {
    const tabletCategory = `58058`;
    let data = await ebaySearch(tabletCategory, 'ipad', start, limit);
    // console.log(data);
    data.itemSummaries.forEach(item => {
        // console.log(JSON.stringify(item, null, 2));
        if (item.itemGroupType) {
            // console.log(`**${item.title}`);
            // console.log(`  ${item.buyingOptions[0]} ${item.price.value} ${item.condition} ${item.color}`);
        } else {
            // console.log(`${item.title}`);
            // console.log(`  ${item.buyingOptions[0]} ${item.price.value} ${item.condition} ${item.color}`);
            let line = [];
            //console.log(item.title);
            line.push(item.price.value);
            let style = item.title.match(/pro|mini|air/i);
            if (style) line.push(style[0]);
            else line.push("ipad");
            let gen = item.title.match(/ (\d)(st|th|nd|rd|r) gen|mini (\d)|ipad (\d+[^t])/i);
            if (gen) {
                gen = gen[1]||gen[3]||gen[4];
                line.push(gen)
            }
            else line.push("");
            let size = item.title.match(/(\d+([.]\d)?) ?(\"|inch|in)/i);
            if (size) line.push(size[1]);
            else line.push("");
            let gb = item.title.match(/\d+GB/);
            if (gb) line.push(gb[0]);
            else line.push("");
            let model = item.title.match(/M.*\/A/) || item.title.match(/A\d{4}/);
            if (model) line.push(model[0]);
            else line.push("");
            let time = item.title.match(/mid|early|late[^s]/i);
            if (time) line.push(time[0]);
            else line.push("");
            let year = item.title.match(/20\d\d/);
            if (year) line.push(year[0]);
            else line.push("");
            let wifi = item.title.match(/wi-fi|wifi/i);
            if (wifi) line.push(wifi[0]);
            else line.push("");
            let cellular = item.title.match(/sprint|verizon|4g[^b]|lte|cellular/i);
            if (cellular) line.push(cellular[0]);
            else line.push("");
            let unlocked = item.title.match(/unlocked/i);
            if (unlocked) line.push(unlocked[0]);
            else line.push("");
            let color = item.title.match(/gold|silver|gray|grey|black/i);
            if (color) line.push(color[0]);
            else line.push("");
            console.log(line.join(","));
        }
    });
}

async function main() {
    console.log(`price,style,size,gen,gb,model,time,year,wifi,cellular,unlocked,color`);
    getIpadSummaries(0,100);
    getIpadSummaries(101,100);
    getIpadSummaries(201,100);
    getIpadSummaries(301,100);
    getIpadSummaries(401,100);
}

main();
