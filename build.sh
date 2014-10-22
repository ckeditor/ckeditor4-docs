#!/bin/bash
# Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
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

CONFIG=" --config config.json "

if [[ $1 = --config ]]
then
    CONFIG=" --config $2 "
fi

set -e

echo "CKEditor Documentation Builder"
echo "=============================="

# The default path for ckeditor-dev.
CKEDITOR_DEV="repos/ckeditor-dev"

# Check if ckeditor-dev path is in an environment variable.
if [ $CKEDITOR_DEV_PATH ];
then
	CKEDITOR_DEV=$CKEDITOR_DEV_PATH

	echo ""
	echo "Detected \$CKEDITOR_DEV_PATH. It'll be used as documentation source:"
	echo $CKEDITOR_DEV_PATH
else
	# Check if the documentation folder is at the same level of ckeditor-dev.
	if [ -f "../ckeditor-dev/ckeditor.js" ];
	then
		CKEDITOR_DEV="../ckeditor-dev"

		echo ""
		echo "Detected '../ckeditor-dev'. It'll be used as documentation source."
	fi
fi

PATHS="$CKEDITOR_DEV/core $CKEDITOR_DEV/plugins $CKEDITOR_DEV/adapters $CKEDITOR_DEV/ckeditor.js"

echo ""
echo "Building the documentation into the 'build/' directory..."

# Move to the script directory.
cd $(dirname $0)

ckeditor-jsduck $CONFIG $@ -- $PATHS

echo "Applying customizations..."
cp -r source/resources build
cp source/favicon.ico build
cp source/.htaccess build
# Let the license be more visible and it's usually uppercased.
cp source/license.html build/LICENSE.html
cp -r images build

echo "Documentation creation finished!"
echo ""
