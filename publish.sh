#!/bin/bash

# VolcEngine MCP Server - Publish Script

echo "🔧 Building VolcEngine MCP Server..."

# Clean and build
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Check if user is logged in to npm
npm whoami 2>/dev/null
if [ $? -ne 0 ]; then
    echo "🔑 Please login to npm first:"
    echo "   npm login"
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")

echo "📦 Current version: $CURRENT_VERSION"

# Ask for version bump
read -p "📝 Enter new version (or press enter to keep $CURRENT_VERSION): " NEW_VERSION

if [ -z "$NEW_VERSION" ]; then
    NEW_VERSION=$CURRENT_VERSION
fi

# Update version in package.json
npm version $NEW_VERSION --no-git-tag-version

if [ $? -ne 0 ]; then
    echo "❌ Failed to update version!"
    exit 1
fi

echo "🔄 Updated to version $NEW_VERSION"

# Publish to npm
echo "🚀 Publishing to npm..."
npm publish --access public

if [ $? -ne 0 ]; then
    echo "❌ Publish failed!"
    exit 1
fi

echo "🎉 Successfully published volcengine-mcp-server@$NEW_VERSION to npm!"

# Create git tag
echo "🏷️ Creating git tag v$NEW_VERSION..."
git add .
git commit -m "Release v$NEW_VERSION"
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"
git push origin main --tags

echo "✅ All done! The package is now available on npm."