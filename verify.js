#!/usr/bin/env node

// Verify that the package is ready for publishing

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verifying VolcEngine MCP Server package (ESM)...\n');

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
  const filePath = join(__dirname, file);
  if (existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

console.log('\n📦 Package.json checks:');
const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));

// Check package.json fields
const requiredFields = ['name', 'version', 'description', 'main', 'bin', 'scripts', 'type'];
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
try {
  const distFiles = readdirSync(join(__dirname, 'dist'));
  distFiles.forEach(file => {
    const filePath = join(__dirname, 'dist', file);
    if (existsSync(filePath)) {
      const stats = readFileSync(filePath, 'utf8').length;
      console.log(`   ${file}: ${stats} bytes`);
    }
  });
} catch (e) {
  console.log('   Could not read dist directory');
}

// Check ESM configuration
console.log('\n🔧 ESM Configuration:');
if (packageJson.type === 'module') {
  console.log('✅ package.json has "type": "module"');
} else {
  console.log('❌ package.json missing "type": "module"');
  allFilesExist = false;
}

// Check compiled files for ESM syntax
console.log('\n📝 Checking compiled files for ESM syntax:');
const compiledFiles = ['dist/cli.js', 'dist/mcp-server.js'];
compiledFiles.forEach(file => {
  const filePath = join(__dirname, file);
  if (existsSync(filePath)) {
    const content = readFileSync(filePath, 'utf8');
    if (content.includes('import ') || content.includes('export ')) {
      console.log(`✅ ${file} uses ESM syntax`);
    } else {
      console.log(`❌ ${file} may not use ESM syntax`);
    }
  }
});

// Final result
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 VERIFICATION PASSED - Package is ready for publishing!');
  console.log('\nTo publish:');
  console.log('1. Run: ./publish.sh');
  console.log('2. Or manually: npm publish --access public');
  console.log('\n📋 Package Summary:');
  console.log(`   Name: ${packageJson.name}`);
  console.log(`   Version: ${packageJson.version}`);
  console.log(`   Type: ${packageJson.type}`);
  console.log(`   Main: ${packageJson.main}`);
  console.log(`   Bin: volcengine-mcp -> ${packageJson.bin?.['volcengine-mcp']}`);
} else {
  console.log('❌ VERIFICATION FAILED - Please fix the issues above.');
  process.exit(1);
}