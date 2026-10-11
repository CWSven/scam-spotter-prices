# Scam Spotter price list

`prices.json` holds the lowest believable asking prices (USD) for used items that are often faked in
marketplace scams. The [Scam Spotter](../scam-spotter) browser extension downloads it once a day; a
listing priced below the number gets a warning sign. Each user's copy of the extension can also learn
local prices from listings they browse, and their own prices in Settings always win.

- `items`: `{ "keywords": "iphone 15 pro max", "min": 420 }`, up to 1000. A listing title matches the most
  specific entry whose keywords appear in it in order ("iphone 15 pro max" over "iphone 15"). Entries are by
  model or tool type, not whole brands: a brand like Milwaukee or YETI sells everything from $20 items to $800 ones.
  Specific entries still come before general ones (check.js enforces it).
- `min` is about 50-60% of the typical used price: low enough that honest bargains pass, high enough
  that "too good to be true" prices get flagged.
- Updated weekly from public used-price research (resale sites, trade-in values, price guides,
  reviews). No eBay API data and nothing from Facebook.
- `node check.js` validates the file; run it before every commit.
