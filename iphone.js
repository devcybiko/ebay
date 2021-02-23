module.exports = async function (start, limit, ebaySearch$, ebayGroup$) {
    const tabletCategory = `9355`;
    let firstTime = true;
    const results = [];
    let titles = [];
    let data = await ebaySearch$(tabletCategory, 'iphone', start, limit);

    data.itemSummaries.forEach(async item => {
        console.error(JSON.stringify(item, null, 2));
        if (item.itemGroupType) {
            titles.push(item.title);
            // console.error(`**${item.title}`);
            // console.error(JSON.stringify(item, null, 2));
            // let result = await ebayGroup$(item.itemGroupHref);
            // console.error(result.items.map(item => item.localizedAspects));
            //console.error(`  ${item.itemId} ${item.itemWebUrl} ${item.buyingOptions[0]} ${item.price.value} ${item.condition} ${item.color}`);
        } else {
            // console.log(item.title);
            //console.error(`${item.title}`);
            // console.log(`  ${item.buyingOptions[0]} ${item.price.value} ${item.condition} ${item.color}`);
            //console.log(item.title);
            // console.error(JSON.stringify(item, null, 2));
            //Apple iPhone X - 256GB Silver - T-Mobile AT&T Metro GSM Unlocked Smartphone

            let itemId = item.itemId;
            item.title = replaceAll(item.title,'-', ' ');
            item.title = replaceAll(item.title,';', ' ');
            item.title = replaceAll(item.title,',', ' ');
            let gen = item.title.match(/iphone (.+?) /i) || [];
            let gb = item.title.match(/\d+GB/) || [];
            let color = item.title.match(/gold|silver|gray|grey|black/i) || [];
            let cellular = item.title.match(/sprint|verizon|4g[^b]|lte|cellular|AT&T|T-Mobile/i) || [];
            let unlocked = item.title.match(/unlocked/i) || [];
            let model = item.title.match(/M.*\/A/) || item.title.match(/A\d{4}/) || [];
            let gsm = item.title.match(/GSM/i) || item.title.match(/A\d{4}/) || [];
            let pro = item.title.match(/pro/i) || [];
            let plus = item.title.match(/plus|max/i) || [];

            gen = gen[1]||gen[3]||gen[4]||"other";
            if (gen === '10') gen = 'x';
            if (gen.endsWith("+")) {
                plus = "plus";
                gen = gen.substring(0, gen.length-1);
            }
            if (gen.endsWith("plus")) {
                plus = "plus";
                gen = gen.substring(0, gen.length-"plus".length);
            }
            ipad = {
                //itemId: itemId,
                iphone: 'iphone',
                gen: gen.trim(),
                pro: (pro[0] || "").trim(),
                plus: (plus[0] || "").trim(),
                storage: (gb[0] || "other").trim(),
                color: (color[0] || "").trim(),
                price: (item.price.value || "").trim(),
                cellular: (cellular[0] || "").trim(),
                unlocked: (unlocked[0] || "").trim(),
                model: (model[0] || "").trim(),
                gsm: (gsm[0] || "").trim(),
                title: (item.title).trim(),
                url: (item.itemWebUrl).trim(),
            }
            if (start === 0 && firstTime) {
                results.push(Object.keys(ipad));
                firstTime = false;
            }
            results.push(Object.values(ipad).map(item => `"${item}"`).join(",").toLowerCase());
        }
    });
    // console.error(titles.sort());
    results.total = data.total;
    results.offset = data.offset;
    return results;
}
