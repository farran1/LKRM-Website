const fs = require('fs');
const path = require('path');

console.log('Post-processing build output...');

// Read the built HTML file
const htmlPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Remove type="module" from the script tag to match working gh-pages branch
html = html.replace(/type="module"/g, '');

// Write the modified HTML back
fs.writeFileSync(htmlPath, html);

console.log('Removed type="module" from HTML file');
console.log('Build is now ready for deployment!');
