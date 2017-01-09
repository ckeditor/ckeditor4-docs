<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Specifying the Editor Path #

As explained in the [Loading CKEditor](#!/guide/dev_ckeditor_js_load) article, to make CKEditor work it is enough to include the `ckeditor.js` file in your pages. However, there are some situations when the original editor file name cannot be used:

* The file must be renamed, for any reason.
* The original editor script is merged with other scripts used in the page to reduce the number of files being downloaded. This single file will also have a name that is different from `ckeditor.js`. This is the most common case.
* You have yet another file named `ckeditor.js` which is not placed in the editor installation directory.

## Problem ##

In order to work correctly CKEditor needs to know where in the structure of the website it is installed. Thanks to that information the editor is able to load other resource files like skins, language files, plugins, etc. In other words, the **editor installation path** is needed.

By default, CKEditor is looking for the `ckeditor.js` file in the `<script>` tags present in the page in order to automatically retrieve its installation path. If it is not able to find it, just like in the cases presented above, the editor will simply not work.

## Solution: CKEDITOR_BASEPATH ##

When loading the editor script, CKEditor is looking for the global `CKEDITOR_BASEPATH` JavaScript variable that contains the editor installation path. If it is defined, its value is used. Otherwise the automatic detection process described above takes place. In order to solve this uncommon loading issue it is thus enough to define the `CKEDITOR_BASEPATH` variable. For example:

	<script>
		var CKEDITOR_BASEPATH = '/ckeditor/';
	</script>

	<script src="all_my_scripts.js"></script>

Note that this global JavaScript variable must be set ***before*** you include the CKEditor code. In the example above the variable definition was placed in-page, but it could also be included inside the `all_my_scripts.js` file, at the beginning (or in any case &mdash; before the editor code).
