// Checks prices.json before it's published: run "node check.js". Exits with an error (and says
// why) if anything is malformed, so a bad update never goes out.
var fs = require('fs');
var data = JSON.parse(fs.readFileSync(__dirname + '/prices.json', 'utf8'));
var problems = [];
if (data.format !== 1) problems.push('format must be 1');
if (!/^\d{4}-\d{2}-\d{2}$/.test(data.updated || '')) problems.push('updated must be YYYY-MM-DD');
if (!Array.isArray(data.items) || data.items.length < 20 || data.items.length > 2000) problems.push('items must be a list of 20-2000 entries');
var seen = {};
(data.items || []).forEach(function (it, i) {
  if (!/^[a-z0-9][a-z0-9 +.\-]{1,39}$/.test(it.keywords || '')) problems.push('item ' + i + ': bad keywords "' + it.keywords + '"');
  if (!Number.isInteger(it.min) || it.min < 1 || it.min > 100000) problems.push('item ' + i + ': min must be a whole number 1-100000');
  if (seen[it.keywords]) problems.push('item ' + i + ': duplicate "' + it.keywords + '"');
  seen[it.keywords] = true;
});
// A more specific line must come before a general one it contains ("iphone 15" before "iphone").
(data.items || []).forEach(function (a, i) {
  (data.items || []).slice(i + 1).forEach(function (b) {
    // Repeated words count ("macbook pro m4 pro" has two "pro"s, so it contains "macbook pro m4", not the other way round).
    var aw = String(a.keywords).split(' '), left = String(b.keywords).split(' ');
    var inB = aw.every(function (w) { var k = left.indexOf(w); if (k < 0) return false; left.splice(k, 1); return true; });
    if (a.keywords !== b.keywords && inB) {
      problems.push('"' + b.keywords + '" (more specific) must come before "' + a.keywords + '"');
    }
  });
});
if (problems.length) { console.error('prices.json has problems:\n- ' + problems.join('\n- ')); process.exit(1); }
console.log('prices.json OK: ' + data.items.length + ' items, updated ' + data.updated);
