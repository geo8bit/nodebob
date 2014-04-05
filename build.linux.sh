#!/bin/bash -e
echo "nodebob v0.1"
echo "---"
echo
CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


echo "Creating bundle for linux-ia32..."
mkdir -p release.linux-ia32
rm -f release.linux-ia32/app.nw
zip -b app -r release.linux-ia32/app.nw app/*
cat buildTools/nw.linux-ia32/nw release.linux-ia32/app.nw > release.linux-ia32/app
chmod +x release.linux-ia32/app
if [ ! -f release.linux-ia32/nw.pak ]; then
  cp buildTools/nw.linux-ia32/nw.pak release.linux-ia32/nw.pak
fi
if [ ! -f release.linux-ia32/libffmpegsumo.so ]; then
  cp buildTools/nw.linux-ia32/libffmpegsumo.so release.linux-ia32/libffmpegsumo.so
fi

echo "Creating bundle for linux-x64..."
mkdir -p release.linux-x64
rm -f release.linux-x64/app.nw
zip -b app -r release.linux-x64/app.nw app/*
cat buildTools/nw.linux-x64/nw release.linux-x64/app.nw > release.linux-x64/app
chmod +x release.linux-x64/app
if [ ! -f release.linux-x64/nw.pak ]; then
  cp buildTools/nw.linux-x64/nw.pak release.linux-x64/nw.pak
fi
if [ ! -f release.linux-x64/libffmpegsumo.so ]; then
  cp buildTools/nw.linux-x64/libffmpegsumo.so release.linux-x64/libffmpegsumo.so
fi

echo "Deleting temporary files..."
rm -f release.linux-ia32/app.nw
rm -f release.linux-x64/app.nw
echo "Done!"
