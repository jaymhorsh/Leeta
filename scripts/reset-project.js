const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const log = (message) => console.log(`\n🚀 ${message}`);

log('Welcome to your Expo project reset script!');
log('This script will help you clean up your project and start fresh.');

// Remove node_modules and package-lock.json
log('Cleaning up dependencies...');
try {
  if (fs.existsSync(path.join(projectRoot, 'node_modules'))) {
    execSync('rm -rf node_modules', { stdio: 'inherit' });
  }
  if (fs.existsSync(path.join(projectRoot, 'package-lock.json'))) {
    fs.unlinkSync(path.join(projectRoot, 'package-lock.json'));
  }
} catch (error) {
  log('Error cleaning up dependencies: ' + error.message);
}

// Remove .expo folder
log('Cleaning up Expo cache...');
try {
  if (fs.existsSync(path.join(projectRoot, '.expo'))) {
    execSync('rm -rf .expo', { stdio: 'inherit' });
  }
} catch (error) {
  log('Error cleaning up Expo cache: ' + error.message);
}

// Remove dist folder
log('Cleaning up build artifacts...');
try {
  if (fs.existsSync(path.join(projectRoot, 'dist'))) {
    execSync('rm -rf dist', { stdio: 'inherit' });
  }
} catch (error) {
  log('Error cleaning up build artifacts: ' + error.message);
}

log('✅ Project cleanup completed!');
log('You can now run "npm install" to reinstall dependencies.');
