const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Copying .nojekyll file...');
fs.copyFileSync('.nojekyll', 'dist/.nojekyll');

console.log('Copying _headers file...');
fs.copyFileSync('public/_headers', 'dist/_headers');

console.log('Copying _redirects file...');
fs.copyFileSync('public/_redirects', 'dist/_redirects');

console.log('Build complete! Files are ready for deployment.');
