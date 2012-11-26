#!/bin/bash
# Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
# For licensing, see LICENSE.html or http://ckeditor.com/license

#
# README
#
# To build docs you need to have JSDuck installed in your OS,
# so global 'jsduck' script is available.
#
# The easiest way to do this is by standard rubygems:
# $ [sudo] gem install jsduck
#
# For more information, please refer to https://github.com/senchalabs/jsduck#getting-it
#
# Docs will be generated in dev/docs/build/ directory.
#

set -e

echo "CKEditor Documentation Builder"
echo "=============================="

CKEDITOR_DEV="repos/ckeditor-dev"

if [ -f "../ckeditor-dev/ckeditor.js" ];
then
	CKEDITOR_DEV="../ckeditor-dev"

	echo ""
	echo "Detected '../ckeditor-dev'. It'll be used as documentation source."
fi

PATHS="$CKEDITOR_DEV/core $CKEDITOR_DEV/plugins $CKEDITOR_DEV/ckeditor.js"

echo ""
echo "Building the documentation into the 'build/' directory..."

# Move to the script directory.
cd $(dirname $0)

jsduck --config=config.json $@ -- $PATHS

echo "Applying customizations..."
cp -r source/resources build
cp source/favicon.ico build
cp -r images build

echo "Finished!"
echo ""
