# Build from Source Code

If you're working with the source code of CKEditor in your computer or local network, at some stage you'll have to distribute it into test or production websites. 

**Never distribute the source version of CKEditor into production websites**. There are serious [performance implications](#!/guide/dev_source-section-2) on doing this.

Instead, you must create a CKEditor "build" or "release version" (in contrast to "source version"). It is an optimized production ready CKEditor distribution.

## The `dev/builder` Folder

The source code of CKEditor contains a pre-configured environment so you can easily create CKEditor builds.

The following are the files that are most relevant:

 * `build.sh`: the build runner bash script.
 * `build-config.js`: the build configuration file.

## Step 1: Build Setup

You should edit the `build-config.js` file, which contains the build configuration. It has the following sections:

	var CKBUILDER_CONFIG = {	
		// Skin name.
		skin: '...',
		
		// Files to be ignored.
		ignore: [ ... ],
		
		// Plugins to be included.
		plugins: { ... }
	};

The most important parts of the file is the `skin` name and the list of `plugins`. Be sure to have them properly set, with the things you really want in your build.

You don't need to include all plugins into that list. CKBuilder will discover their dependencies and load them as well.

## Step 2: Running the Builder

There is little to add now. Simply go to the command line and call the build script:

	sh build.sh
	
The builder will be executed and the resulting build will be created in the `dev/builder/build` folder.

## About CKBuilder (Command Line)
	
The building process is handled by the command line version of **CKBuilder**. It is a powerful application that makes several enhancement to the source code. It loads the configuration file, discover plugin dependencies, merge and minify files, create icon strips and perform many other tasks.

For the first run, `build.sh` will [download CKBuilder](http://download.cksource.com/CKBuilder/), if not available, and copy it into the `dev/builder/ckbuilder/<ckbuilder version>` folder. Therefore, Internet connection is required. Once the file is available, no more downloads are required (but still the script tries to update it, if possible).

The only requirement to run CKBuilder is [Java](http://www.java.com/en/download/).
