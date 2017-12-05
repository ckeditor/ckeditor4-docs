<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Building CKEditor from Source Code

If you are working with the CKEditor source code on your computer or in a local network, at some stage you will want to distribute it to your test or production environment.

<p class="tip">
	<strong>Never distribute the source version of CKEditor to production websites</strong>. There are serious <a href="#!/guide/dev_source-section-2">performance implications</a> of doing this.
</p>

Instead, you must create a CKEditor "build" or "release version" (in contrast to the "source version"). It is an optimized, production-ready CKEditor distribution.

## The `dev/builder` Folder

<p class="tip alert">The builder will only work on the source version of CKEditor cloned from the a Git repository (for example from the <a href="https://github.com/ckeditor/ckeditor-dev">official CKEditor development repository</a>). It will not work on the project downloaded as a <code>.zip</code> package.</p>

The source code of CKEditor contains a pre-configured environment that allows you to easily create editor builds.

The following are the most relevant files that you can find there:

 * `build.sh` &ndash; the build runner Bash script.
 * `build-config.js` &ndash; the build configuration file.

## Step 1: Build Setup

Edit the `build-config.js` file which contains the build configuration. It includes the following sections:

	var CKBUILDER_CONFIG = {
		// Skin name.
		skin: '...',

		// Files to be ignored.
		ignore: [ ... ],

		// Plugins to be included.
		plugins: { ... }
	};

The most important parts are the `skin` name and the list of `plugins`. These need to be set properly and include all the things you want to have in your build.

Some plugins might need others to work, but you do not have to resolve these dependencies by yourself as CKBuilder will do this for you.

## Step 2: Running the Builder

Go to the command line and call the build script:

	./build.sh

The builder will be executed and the resulting build will be created in the `dev/builder/build` folder.

## About CKBuilder (Command Line)

The building process is handled by the command line version of [CKBuilder](https://ckeditor.com/cke4/builder). It is a powerful application that makes several enhancements to the source code: it loads the configuration file, resolves plugin dependencies, merges and minifies files, creates icon strips, and performs many other build-related tasks.

For the first run, `build.sh` will need to [download CKBuilder](http://download.cksource.com/CKBuilder/) and copy it into the `dev/builder/ckbuilder/<ckbuilder version>` folder, so an Internet connection is required. Once the file is available, no more downloads are necessary (though if possible, the script will try to perform an update on consecutive runs).

The only requirement to run CKBuilder is [Java](http://www.java.com/en/download/).
