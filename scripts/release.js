#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const versionType = args[0] || 'patch'; // patch, minor, major

if (!['patch', 'minor', 'major'].includes(versionType)) {
  console.error('Usage: npm run release [patch|minor|major]');
  process.exit(1);
}

console.log(`🚀 Starting ${versionType} release...`);

try {
  // 1. Run tests and build
  console.log('📋 Running tests and build...');
  execSync('npm run ci', { stdio: 'inherit' });

  // 2. Version bump
  console.log(`📦 Bumping ${versionType} version...`);
  execSync(`npm version ${versionType}`, { stdio: 'inherit' });

  // 3. Get new version
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const newVersion = packageJson.version;
  console.log(`✅ New version: ${newVersion}`);

  // 4. Build Storybook for documentation
  console.log('📚 Building Storybook documentation...');
  execSync('npm run build-storybook', { stdio: 'inherit' });

  // 5. Create git tag
  console.log('🏷️  Creating git tag...');
  execSync(`git add .`, { stdio: 'inherit' });
  execSync(`git commit -m "chore: release v${newVersion}"`, { stdio: 'inherit' });
  execSync(`git tag v${newVersion}`, { stdio: 'inherit' });

  console.log(`🎉 Release v${newVersion} prepared!`);
  console.log('📝 Next steps:');
  console.log('  1. git push origin main');
  console.log('  2. git push origin --tags');
  console.log('  3. npm publish');
  console.log('  4. Create GitHub release with changelog');

} catch (error) {
  console.error('❌ Release failed:', error.message);
  process.exit(1);
}