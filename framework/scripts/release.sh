#!/bin/sh

DIR=/opt/homebrew/var/www/dll

if [ -d "$DIR" ]; then
  echo "remove old $DIR"
  rm -rf $DIR
fi

cp -R ./dist/ $DIR

echo "done!"