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
        console.log(error);
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
            console.log(response);
            return {itemSummaries: []};
        }
        return response.data;
    } catch (error) {
        console.log(error.response);
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
            console.log(response);
            return {itemSummaries: []};
        }
        return response.data;
    } catch (error) {
        console.log(error.response);
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
        console.log(request);
        const instance = axios.create(request);
        const response = await instance.request(request);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.log(JSON.stringify(error.response.data));
    }
}


async function getIpadSummaries$(start, limit) {
    const tabletCategory = `58058`;
    const results = [];
    let titles = [];
    let data = await ebaySearch$(tabletCategory, 'ipad', start, limit);
    data.itemSummaries.forEach(async item => {
        // console.error(JSON.stringify(item, null, 2));
        if (item.itemGroupType) {
            titles.push(item.title);
            console.error(`**${item.title}`);
            console.error(JSON.stringify(item, null, 2));
            let result = await ebayGroup$(item.itemGroupHref);
            console.error(JSON.stringify(result, null, 2));
            process.exit();
            //console.error(`  ${item.itemId} ${item.itemWebUrl} ${item.buyingOptions[0]} ${item.price.value} ${item.condition} ${item.color}`);
        } else {
            //console.error(`${item.title}`);
            // console.log(`  ${item.buyingOptions[0]} ${item.price.value} ${item.condition} ${item.color}`);
            //console.log(item.title);
            // console.error(JSON.stringify(item, null, 2));
            let itemId = item.itemId;
            let style = item.title.match(/pro|mini|air/i) || [];
            let gen = item.title.match(/ (\d)(st|th|nd|rd) gen|mini (\d)|ipad (\d+[^trns])/i) || [];
            let size = item.title.match(/(\d+([.]\d)?) ?(\"|inch|in)/i) || [];
            let gb = item.title.match(/\d+GB/) || [];
            let model = item.title.match(/M.*\/A/) || item.title.match(/A\d{4}/) || [];
            let time = item.title.match(/mid|early|late[^s]/i) || [];
            let year = item.title.match(/20\d\d/) || [];
            let wifi = item.title.match(/wi-fi|wifi/i) || [];
            let cellular = item.title.match(/sprint|verizon|4g[^b]|lte|cellular/i) || [];
            let unlocked = item.title.match(/unlocked/i) || [];
            let color = item.title.match(/gold|silver|gray|grey|black/i) || [];

            ipad = {
                itemId: itemId,
                price: item.price.value,
                condition: item.condition.toLowerCase(),
                style: style[0] ||  "ipad",
                gen: gen[1]||gen[3]||gen[4]||"",
                size: size[1] || "",
                storage: gb[0] || "",
                model: model[0] || "",
                season:  time[0] || "",
                year: year[0] || "",
                wifi: wifi[0] || "",
                cellular: cellular[0] || "",
                unlocked: unlocked[0] || "",
                color: color[0] || "",
                url: item.itemWebUrl,
            }
            //console.log(ipad);
            results.push(ipad);
        }
    });
    console.error(titles.sort());
    return results;
}

async function main$() {
    console.log(`price,condition,style,gen,size,gb,model,time,year,wifi,cellular,unlocked,color,url`);
    let results = [];
    let start = 0;
    let count = 100;
    let max = 100;
    for(let start = 0; results.length < max; start += count) {
        // console.error(start);
        let ipads = await getIpadSummaries$(start,count);
        // console.error(ipads.length);
        if (!ipads) break;
        results = results.concat(ipads);
        start += count;
        console.error(results.length);
    }
    console.log(results);
}

main$();
