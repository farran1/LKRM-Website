const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Copying .nojekyll file...');
fs.copyFileSync('.nojekyll', 'dist/.nojekyll');

console.log('Running post-build processing...');
execSync('node post-build.cjs', { stdio: 'inherit' });

console.log('Build complete! Files are ready for deployment.');
