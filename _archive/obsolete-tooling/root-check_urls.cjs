const fs = require('fs');
const https = require('https');

const blogs = JSON.parse(fs.readFileSync('src/data/blogs-generated.json', 'utf8'));
const urls = [...new Set(blogs.map(b => b.ogImage))];

console.log(`Checking ${urls.length} unique URLs...`);

let done = 0;
urls.forEach(url => {
  if (!url.startsWith('https://')) {
    console.log(`INVALID PROTOCOL: ${url}`);
    done++;
    return;
  }
  https.get(url, (res) => {
    if (res.statusCode !== 200) {
      console.log(`[${res.statusCode}] ${url}`);
    }
    res.resume();
    done++;
    if (done === urls.length) console.log('Finished');
  }).on('error', err => {
    console.log(`[ERROR] ${err.message} - ${url}`);
    done++;
    if (done === urls.length) console.log('Finished');
  });
});
