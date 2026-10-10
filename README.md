# Scam Spotter price list

`prices.json` holds the lowest believable asking prices (USD) for used items that are often faked in
marketplace scams. The [Scam Spotter](../scam-spotter) browser extension downloads it once a day; a
listing priced below the number gets a warning sign. Each user's copy of the extension can also learn
local prices from listings they browse, and their own prices in Settings always win.

- `items`: `{ "keywords": "iphone 15", "min": 300 }`. A listing title matches the first entry whose
  keywords all appear in it, so specific entries come before general ones.
- `min` is about 50-60% of the typical used price: low enough that honest bargains pass, high enough
  that "too good to be true" prices get flagged.
- Updated weekly from public used-price research (resale sites, trade-in values, price guides,
  reviews). No eBay API data and nothing from Facebook.
- `node check.js` validates the file; run it before every commit.
