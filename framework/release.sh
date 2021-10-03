#!/bin/sh

cd packages/components
cp -R ./src/ .release
cp *.* .release

cd ../../

cd packages/pages
cp -R ./src/ .release
cp *.* .release

cd ../../

cd packages/portal
cp -R ./src/ .release
cp *.* .release

cd ../../