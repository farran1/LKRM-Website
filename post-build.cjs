const fs = require('fs');
const path = require('path');

console.log('Post-processing build output...');

// Read the built HTML file
const htmlPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Read the JavaScript file
const jsPath = path.join(__dirname, 'dist', 'assets', 'index.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// Replace the script tag with inline JavaScript
html = html.replace(
  /<script[^>]*src="[^"]*"[^>]*><\/script>/g,
  `<script>${jsContent}</script>`
);

// Remove type="module" from any remaining script tags
html = html.replace(/type="module"/g, '');

// Write the modified HTML back
fs.writeFileSync(htmlPath, html);

console.log('Embedded JavaScript into HTML file');
console.log('Build is now ready for deployment!');
