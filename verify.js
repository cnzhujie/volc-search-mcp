#!/usr/bin/env node

// Verify that the package is ready for publishing

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying VolcEngine MCP Server package...\n');

// Check required files
const requiredFiles = [
  'package.json',
  'README.md',
  'dist/index.js',
  'dist/cli.js',
  'dist/mcp-server.js',
  'dist/volcengine-client.js',
  'dist/types.js'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

console.log('\n📦 Package.json checks:');
const packageJson = require('./package.json');

// Check package.json fields
const requiredFields = ['name', 'version', 'description', 'main', 'bin', 'scripts'];
requiredFields.forEach(field => {
  if (packageJson[field]) {
    console.log(`✅ ${field}: ${JSON.stringify(packageJson[field])}`);
  } else {
    console.log(`❌ ${field} - MISSING`);
    allFilesExist = false;
  }
});

// Check bin entry
if (packageJson.bin && packageJson.bin['volcengine-mcp']) {
  console.log(`✅ bin entry: volcengine-mcp -> ${packageJson.bin['volcengine-mcp']}`);
} else {
  console.log('❌ bin entry missing or incorrect');
  allFilesExist = false;
}

// Check dependencies
console.log('\n📦 Dependencies:');
if (packageJson.dependencies) {
  Object.keys(packageJson.dependencies).forEach(dep => {
    console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
  });
}

// Check dist files size
console.log('\n📊 Distribution file sizes:');
const distFiles = fs.readdirSync(path.join(__dirname, 'dist'));
distFiles.forEach(file => {
  const filePath = path.join(__dirname, 'dist', file);
  const stats = fs.statSync(filePath);
  console.log(`   ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
});

// Final result
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 VERIFICATION PASSED - Package is ready for publishing!');
  console.log('\nTo publish:');
  console.log('1. Run: ./publish.sh');
  console.log('2. Or manually: npm publish --access public');
} else {
  console.log('❌ VERIFICATION FAILED - Please fix the issues above.');
  process.exit(1);
}