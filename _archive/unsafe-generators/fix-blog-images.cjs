const fs = require('fs');

const actualPictures = [
  "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1617325247661-675ab03407b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1531326233158-e4b9fdb8669c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512141551606-f1311cc71488?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522771731478-44ba10e58d6a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507652313651-74ff220ea21b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1595514619424-00e9ec0e9603?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1588166668789-d91ab2d80d29?auto=format&fit=crop&w=1200&q=80"
];

const file = './src/data/blogs-generated.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.forEach((post, i) => {
  let prodId = "";
  if (post.productRefs && post.productRefs.length > 0) {
    prodId = post.productRefs[0].productId || "";
  }
  
  if (prodId === "AS2" || prodId === "amerisleep-as2") {
    post.ogImage = "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as2-listing.jpg";
  } else if (prodId === "AS3" || prodId === "amerisleep-as3") {
    post.ogImage = "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg";
  } else if (prodId === "AS5" || prodId === "amerisleep-as5") {
    post.ogImage = "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as5-listing.jpg";
  } else if (prodId === "AS6" || prodId === "amerisleep-as6") {
    post.ogImage = "https://cdn11.bigcommerce.com/s-36im9ihtig/images/stencil/450w/content/assets/mattress-product/AS6-nav.jpg";
  } else if (prodId === "Organica" || prodId === "amerisleep-organica") {
    post.ogImage = "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-organica-listing.jpg";
  } else {
    post.ogImage = actualPictures[i % actualPictures.length];
  }
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Fixed blogs-generated.json images');
