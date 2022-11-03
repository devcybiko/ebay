# EBAY

Experimental attempts to use the EBAY webservices. It appears I tried to use the web browser's token to hit the same APIs as the Ebay web site. This was abondoned in favor of `ebay-closed` which is another project to hit the ebay developer API, which is a much better solution.

## Files

- ebay-categories.json - a full listing of all the ebay categories. I'm not sure how I acquired this, but it should be updated from time to time as Ebay probably changes their category list
- ebaytoken.txt - this is a copy of the ebay token as stolen from the browser
- index.js - the main driver. it reads 'ipad.js' (or other bit of code) that constructs a query and calls the ebaySearch$ method to find the data. Then it formats the data and returns it.
- ipad.csv - an output file from ipad.js
- ipad.js - an example of the search driver for ipad queries
- ipad.json - an output file from ipad.js
- iphone.csv - an output file from iphone.js
- iphone.js - an example of the search driver for iphone queries
- run.sh - a simple run script