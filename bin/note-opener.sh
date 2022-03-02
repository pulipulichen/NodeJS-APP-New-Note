#!/usr/bin/bash

_mydir="$(pwd)"
BASEDIR=$(dirname "$0")

cd "$BASEDIR"
cd ..

old="$IFS"
IFS=';'
str="'$*'"
node host-scripts/main/openNote.js "$str"
IFS=$old

cd $_mydir