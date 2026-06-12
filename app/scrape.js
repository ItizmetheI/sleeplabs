const https = require('https');

const url = 'https://www.mattressnut.com/14-studio-apartment-ideas-that-actually-make-500-sq-ft-feel-roomy/';
https.get(url, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src="([^"]+)"/g);
    console.log(matches ? matches.slice(0, 10) : 'no images');
  });
}).on('error', console.error);
