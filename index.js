const axios = require('axios');
//https://github.com/axios/axios

const authToken = `v^1.1#i^1#p^1#f^0#r^0#I^3#t^H4sIAAAAAAAAAOVYa2wUVRTudrdIA8UfEASKZh2M1JKZnUf3MQNds33ZRaCPLbWABO/O3NkO3Z0ZZ+60uwS0rUpRokgUX6kRTfARiBGDCCYGQQ2Nf+QHGAETCSTYBEj8IUJIMN6ZLWVbCRS6YhP3z+Tee+653/nOOfecvXT3pOLyjfUbL5W47inc3k13F7pczBS6eFLRgmnuwjlFBXSOgGt790Pdnl734CITpJK60AxNXVNN6E2nkqopOJOVhGWoggZMxRRUkIKmgEQhFlm6RGApWtANDWmiliS80ZpKgudpmQ6wgA5WBPhQAOJZ9ZrOFq2SACzgRJZnaEhLtMwCvG6aFoyqJgIqqiRYmqVJmiVZvoVmBDYksEGqgmNXEt5WaJiKpmIRiibCDlzB2WvkYL05VGCa0EBYCRGORupiDZFoTe2ylkW+HF3hIR5iCCDLHDmq1iTobQVJC978GNORFmKWKELTJHzh7AkjlQqRa2DuAL5DdSAugRAMygDycd5Px/NCZZ1mpAC6OQ57RpFI2REVoIoUlLkVo5iN+FoooqHRMqwiWuO1P00WSCqyAo1KorYqsiLS2EiEHzNgQjMyMRIklCSUDY2MVbWREPhDXJDzV5AQBniWZf1DB2W1DdE86qRqTZUUmzTTu0xDVRCjhqO5YXK4wUINaoMRkZGNKFeOu8YhG1xpOzXrRQu1q7ZfYQoT4XWGt/bA8G6EDCVuITisYfSCQxFOG11XJGL0ohOLQ+GTNiuJdoR0wefr6uqiujhKMxI+lqYZX9vSJTGxHaZwsqVTdq5n5ZVbbyAVxxQRpzGWF1BGx1jSOFYxADVBhDkuxAbYId5HwgqPnv3HRI7NvpEZka8MCTJyBQd4mYcwxPk5Jh8ZEh4KUp+NA8ZBhkwBowMiPQlESIo4zqwUNBRJ4Pwyy4VkSEoBXiYreFkm434pQDIyhDSE8bjIh/5PiTLWUI9B0YAoL7GetzivS8dbtIp2SWpNsAZanOpIxNKR+iXNEXP5481Pt5qdsXgH2xSS0kqicqzZcGPjRU2HjVpSETN5YMDO9TyywBlSIzBQpsrK4HEMJpP4My5zTdvcieVqe7+JFQBdoez0pkQt5dMAvtftqTUOYu9YhHxxK0MlLGgijELCpXXMmxScHxS+JaSxb8neQdiAsW/BfZtkieiODnIuOwozqSTakXlbZ6ZHkDKu6InoejSVshCIJ2E0P9XxP6qMNzRPwb3j2G2yc/0u2IU9m3WxImUbP8rxM2V2ipQBTc0ycM9LNdh9UIvWAVVcVZChJZPQaGXG7ewJ5uPbLL53Znf+Or+JFNtiUsHhs2aiWXZXPKqA8XY3nl7Xm3m2nPGHWJ7jg3RwXLZVO35tyUy0ql6vmQhK/8IfFd/IZ5NwgfNjel1f072u/YUuFx2kSWYB/cgk93KPeyph4uJOmUCV4lqaUoBM4RKqAmQZkOqAGR0oRuEkl3LiqHg558Fm+2p61vCTTbGbmZLzfkPPvb5SxNx7XwkmhmV5mmFDuP2m511f9TAzPTOeOjv3wZ5Lk7W+tSQa6Jn/xjc7CxN0ybCQy1VUgKOrYOEHyulV9y/deeHFA9sOLyxbTc6o9X66Z+uZQ2U7fzx59qP9BzzrX0i93/ftnhWnvHs/XPd7WbNr18CzP4TdsmdvTX//+vLZz2nTT118ou/gS7UNjefr1vTsfu3lDVuOt63dsXjDped3z/rr4kOd329yL/fua5h95FjL5R3HNnf+9IA++HP3l95YzcJX67b+8uvHxy+clsrnrVrdc/xM6NF3/ly8y31+38N12tF3ywYvTn9rm6iWnuv3H+6/uqFp1duTn7x65ZXy7wY3zU/U69PS0YGCvnOlJW7rHPfHkYKZxV8UHRr4pDs5+URsszR/67y2ALha+lvJV8F9n1V//nrpHHXqlth70wY8zwyuO3jlZNPsrBv/Bo/z8BdKEwAA`;
const request = {
    method: 'get',
    url: `https://api.ebay.com/buy/browse/v1/item_summary/search`,
    headers: {
        Authorization: `Bearer ${authToken}`,
    },

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params: {
        category_ids: `108765`,
        q: `Beatles`,
        filter: `price:[200..500]&fileter==priceCurrency:USD`,
        limit: `10`
    },
    timeout: 1000, // default is `0` (no timeout)
    responseType: 'json', // default
    responseEncoding: 'utf8', // default
    maxContentLength: 2000,
};
const instance = axios.create(request);
instance.request()
    .then(response => {
        console.log(response.data.url);
        console.log(response.data.explanation);
    })
    .catch(error => {
        console.log(error);
    });