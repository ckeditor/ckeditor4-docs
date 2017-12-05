<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Inserting Code Snippets Using GeSHi

<p class="requirements">
	This feature was introduced in <strong>CKEditor 4.4</strong>. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and <a href="#!/guide/dev_widget_installation">need to be added to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

The [Code Snippet GeSHi](https://ckeditor.com/cke4/addon/codesnippetgeshi) plugin is an extension of the [Code Snippet](#!/guide/dev_codesnippet) plugin, which uses the [GeSHi](http://qbnz.com/highlighter/) PHP server-side syntax highlighting engine instead of the default, client-side [highlight.js](http://highlightjs.org) library.

{@img codesnippetgeshi_01.png}

## Requirements

* CKEditor 4.4+,
* PHP 4.4+,
* A modern web browser or **IE9+**,
* CKEditor plugin dependencies &mdash; these will be resolved automatically if you follow the recommended CKBuilder installation process.

## Installation

### Back-end Configuration

First of all you need to add both the Code Snippet GeSHi plugin and its dependencies to your CKEditor build and also install the GeSHi library itself.

1. Add the [Code Snippet GeSHi](https://ckeditor.com/cke4/addon/codesnippetgeshi) plugin to your build (as explained in the [Installing Widgets](#!/guide/dev_widget_installation) article). Mind the dependencies &mdash; these will be resolved automatically by [CKBuilder](https://ckeditor.com/cke4/builder).
1. Download the GeSHi library from the Download page at the [GeSHi website](http://qbnz.com/highlighter).
1. Create a `lib` directory next to your `ckeditor` directory.
1. Extract GeSHi files to the chosen location &mdash; for example into the `lib/geshi/` directory.
1. Create a `colorize.php` file (e.g. in the `lib/` directory) and set its content to the following:

		<?php

		if ( function_exists( 'stream_resolve_include_path' ) && stream_resolve_include_path( 'geshi/geshi.php' ) === FALSE ) {
			die( '<pre class="html">Please install the GeSHi library. Refer to plugins/codesnippetgeshi/README.md for more information.</pre>' );
		}

		include_once 'geshi/geshi.php';

		$json_string = file_get_contents( 'php://input' );
		$json_object = json_decode( $json_string );

		$geshi = new GeSHi( $json_object->html, $json_object->lang );

		echo $geshi->parse_code();


    This file will be queried each time the syntax highlighting is needed.

1. At this point you may have a following directory structure:

		lib/
			geshi/
				<GeSHi directories...>
				geshi.php
			colorize.php
		ckeditor/
			<CKEditor files and directories...>
			ckeditor.js

<p class="tip">
	It is a good practice to place external libraries outside the CKEditor directory as it makes <a href="#!/guide/dev_upgrade">future updates</a> easier.
</p>

### Editor Configuration

Go to your [CKEditor configuration](#!/guide/dev_configuration) and set the CKEDITOR.config.codeSnippetGeshi_url option. For example for in-page configuration you can use the following code:

	CKEDITOR.replace( 'editor1', {
		extraPlugins: 'codesnippetgeshi',
		codeSnippetGeshi_url: '../lib/colorize.php'
	} );

You can find more information about setting configuration in the [Setting Configuration guide](#!/guide/dev_configuration).

**Note:** The value of the CKEDITOR.config.codeSnippetGeshi_url option might also be set to an absolute URL.

### Summary

This tutorial uses the `lib/` directory as an example of organizing the directory structure outside CKEditor. Most likely you will want to adjust it to match your needs, but remember to update the path in the CKEDITOR.config.codeSnippetGeshi_url configuration option.

You can now open your page with CKEditor and insert some code into its content by using the **Insert code snippet** feature. As long as the [Code Snippet GeSHi](#!/guide/dev_codesnippetgeshi) plugin is enabled, it will send Ajax requests to the GeSHi adapter file set in the CKEDITOR.config.codeSnippetGeshi_url configuration option.
