const fs = require('fs');
const https = require('https');

const blogsPath = 'src/data/blogs-generated.json';
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
const urls = [...new Set(blogs.map(b => b.ogImage))];

console.log(`Checking ${urls.length} unique URLs...`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
      res.resume();
    }).on('error', () => resolve(false));
  });
}

async function fixImages() {
  const workingUrls = [];
  const brokenUrls = new Set();
  
  for (const url of urls) {
    if (!url.startsWith('https://')) {
      brokenUrls.add(url);
      continue;
    }
    const isOk = await checkUrl(url);
    if (isOk) {
      workingUrls.push(url);
    } else {
      brokenUrls.add(url);
      console.log(`Broken: ${url}`);
    }
  }
  
  if (workingUrls.length === 0) {
    console.error("No working URLs found!");
    return;
  }
  
  let updatedCount = 0;
  for (const blog of blogs) {
    if (brokenUrls.has(blog.ogImage)) {
      // Pick a working URL deterministically based on ID to remain stable
      const idx = blog.slug.length % workingUrls.length;
      blog.ogImage = workingUrls[idx];
      updatedCount++;
    }
  }
  
  fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2));
  console.log(`Fixed ${updatedCount} blog posts by replacing broken images.`);
}

fixImages();
