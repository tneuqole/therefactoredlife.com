#!/bin/sh
set -e

echo "Building..."
pnpm build

echo "Deploying to gh-pages..."
cd dist

git init
git checkout -b gh-pages
git add -A
git commit -m "deploy: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
git remote add origin "$(git -C .. remote get-url origin)"
git push -f origin gh-pages

cd ..
echo "Done."
