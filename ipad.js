module.exports = async function (start, limit, ebaySearch$, ebayGroup$) {
    if (start === 0) {
        console.log(`style,gen,storage,price,condition,size,model,time,year,wifi,cellular,unlocked,color,id,url`);
    }
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
            console.error(result.items.map(item => item.localizedAspects));
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
                style: style[0] ||  "ipad",
                gen: gen[1]||gen[3]||gen[4]||"other",
                storage: gb[0] || "other",
                price: item.price.value,
                condition: item.condition.toLowerCase(),
                model: model[0] || "",
                size: size[1] || "",
                season:  time[0] || "",
                year: year[0] || "",
                wifi: wifi[0] || "",
                cellular: cellular[0] || "",
                unlocked: unlocked[0] || "",
                color: color[0] || "",
                itemId: itemId,
                url: item.itemWebUrl,
            }
            //console.log(ipad);
            results.push(Object.values(ipad).join(",").toLowerCase());
        }
    });
    console.error(titles.sort());
    return results;
}
