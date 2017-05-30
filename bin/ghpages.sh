
BUILD_DIR="$(mktemp -dt marine-ecosystem-build)"
echo 'Copying index.html'
cp index.html "$BUILD_DIR"
echo 'Compiling Sass'
sass --update --stop-on-error --quiet "styles/sass:$BUILD_DIR/styles/css"

echo 'Checking out gh-pages'
git checkout -q gh-pages
echo 'Copying build'
cp -r "$BUILD_DIR/." .
echo 'Committing'
GIT_HASH="$(git rev-parse --short HEAD)"
git add index.html assets styles dist
git commit -m "Build from $GIT_HASH"
echo 'Cleaning up'
rm -rf $BUILD_DIR
git checkout -q master
echo 'All done! Now push the gh-pages branch and see changes at https://brandonfujii.github.io/marine-ecosystem'