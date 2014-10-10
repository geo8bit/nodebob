#!/bin/bash -e
echo "nodebob v0.1"
echo "---"
echo
CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
mkdir -p $CUR_DIR/release.osx/nw

echo "Extracting node-webkit..."
rm -Rf $CUR_DIR/release.osx/nw/node-webkit-v0.10.5-osx-ia32
unzip $CUR_DIR/buildTools/nw.osx/node-webkit-v0.10.5-osx-ia32.zip -d $CUR_DIR/release.osx/nw > /dev/null
echo "Creating bundle for osx..."
rm -Rf $CUR_DIR/release.osx/app.app
cp -R $CUR_DIR/release.osx/nw/node-webkit-v0.10.5-osx-ia32/node-webkit.app $CUR_DIR/release.osx/app.app
cp -R $CUR_DIR/app $CUR_DIR/release.osx/app.app/Contents/Resources/app.nw
cp $CUR_DIR/app/Info.plist $CUR_DIR/release.osx/app.app/Contents/Info.plist
sips -s format tiff $CUR_DIR/app/app.ico --out $CUR_DIR/release.osx/app_icon.tiff > /dev/null
tiff2icns -noLarge $CUR_DIR/release.osx/app_icon.tiff $CUR_DIR/release.osx/app.app/Contents/Resources/nw.icns
echo "Deleting temporary files..."
rm -Rf $CUR_DIR/release.osx/nw/node-webkit-v0.10.5-osx-ia32 $CUR_DIR/release.osx/app_icon.tiff
echo "Done!"
