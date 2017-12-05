<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# API Changes in CKEditor 4

This article describes CKEditor API changes between version 3 and version 4.

## Overview

CKEditor 4 is almost totally backward compatible with CKEditor 3 (v3) in terms of the [JavaScript API](#!/api). Upgrading should generally be hassle-free, although some API elements have changed. They will mostly impact custom plugins that extensively used the [CKEditor 3 API](http://docs.cksource.com/ckeditor_api/).

This page lists the most relevant changes and the proper way to port them to CKEditor 4.

<p class="tip">
	Please note that this list was created before the <strong>CKEditor 4.0 release</strong> and is not updated anymore. For further API changes see the <a href="https://ckeditor.com/cke4/release-notes">CKEditor changelog</a>.
</p>

## Changes

`CKEDITOR.event#fire` now returns `false` if the event was canceled (in v3 it returns `true`).

The listener function sent to `CKEDITOR.event#on` can now return the Boolean `false` to cancel the event.

---

`CKEDITOR.config.corePlugins` is not needed anymore. The "core plugins" are now really part of the core, although their API signatures are left untouched:

 * `plugins/selection/plugin.js` => `core/selection.js`.
	The "Select All" feature originally provided by the `selection` plugin is now a standalone [Select All](https://ckeditor.com/cke4/addon/selectall) plugin.
 * `plugins/styles/plugin.js` => `core/style.js`
 * `plugins/styles/styles/default.js` => `core/styles.js`
 * `plugins/domiterator/plugin.js` => `core/dom/iterator.js`
 * `plugins/htmldataprocessor/plugin.js` => `core/htmldataprocessor.js`

---

The editor will now support **only one single skin per page** (all editors will use the same skin).

Because of the above, the following skin-related properties were moved global or deleted:

 * `CKEDITOR.skins` => `CKEDITOR.skin`
 * `CKEDITOR.skins.add` => **removed**
 * `CKEDITOR.skins.load( editor, partName, callback )` => `CKEDITOR.skin.loadPart( partName, callback )`
 * `CKEDITOR.editor#skinName` => `CKEDITOR.skin.name`
 * `CKEDITOR.editor#skinPath` => `CKEDITOR.skin.getPath( 'editor' )`
 * `CKEDITOR.editor#skinClass` => **removed**

The skin definition file (`skin.js`) was simplified as follows:

 * It no longer specifies the stylesheet file for the skin part. The editor will now expect the CSS file name to be the same as the part name, e.g. the `dialog` part will be requiring the `dialog.css` file in the skin directory.
 * It no longer defines theme-related properties, e.g. dialog margins, combo grouping.

---

The "theme" concept is removed, the DOM structure of the editor is now defined by creators or plugins individually, thus the `CKEDITOR.themes` namespace is removed.

---

`CKEDITOR.editor#setMode` and `CKEDITOR.editor#getMode` are features provided by the themedui creator only,
which is not available in an instance created by the inline creator, where `CKEDITOR.editor#mode` property will be always `'wysiwyg'`.

---

`CKEDITOR.config.editingBlock` was removed, with the `editingBlock` being renewed as `editable`.

---

`CKEDITOR.focusManager` is now managing the overall "active" state of the entire editor
instead of just the editing block, so all editor UI parts (toolbar, dialog, panel)
that receive DOM focus will turn `CKEDITOR.focusManager#hasFocus` to `true`.

Because of the above, `CKEDITOR.editable#hasFocus` should now be used instead for `CKEDITOR.focusManager#hasFocus` to check the focus state of the editing block.

The `CKEDITOR.focusManager#forceBlur` method was removed.

---

`CKEDITOR.config.toolbar_Basic` and `CKEDITOR.config.toolbar_Full` were removed. Custom toolbar layout can be easily managed with `CKEDITOR.config.toolbarGroups`.

---

The "additional CSS" feature provided by `CKEDITOR.editor#addCss` is now moved to the global `CKEDITOR.addCss`, with specified style rules applied **document wide**.

Thus the proper way for a plugin to style its editable content is to call `CKEDITOR.addCss`
inside of the plugin's `onLoad` function, rather than its `init` function in v3.

---

`CKEDITOR.env.version` now reflects the "document mode" in **IE** browsers. The following properties are **deprecated**:

* `CKEDITOR.env.ie6Compat`
* `CKEDITOR.env.ie7Compat`
* `CKEDITOR.env.ie8Compat`
* `CKEDITOR.env.ie9Compat`

If you wanted to check for old IEs before IE9, instead of checking for each of the above properties as in v3:

  	if ( CKEDITOR.ie6Compat || CKEDITOR.ie7Compat || CKEDITOR.ie8Compat )

You should check in the following simpler way in v4:

	if ( CKEDITOR.env.version < 9 )

---

In plugin language files the usual `CKEDITOR.plugins.setLang` call now enforces
a namespace in the format of `editor.lang.pluginName`, which contains the provided
language entries.

So, in v3 you had:

	CKEDITOR.plugins.setLang( 'myplugin', 'en', {
		myplugin: {
			title: 'My Plugin'
		}
	} );

In v4 it should be changed to:

	CKEDITOR.plugins.setLang( 'myplugin', 'en', {
		title: 'My Plugin'
	} );

In this way the entry will be available under `editor.lang.myplugin.title`.

---

The `CKEDITOR.editor` constructor now receives two additional optional parameters (besides the configuration object)
to simplify creator implementation:

	CKEDITOR.editor( config,
	 	/** @type {CKEDITOR.dom.element} */ element,
	 	/** @type {Number} */ elementMode );

---

CKEDITOR creators (`CKEDITOR.replace`, `CKEDITOR.replace` and `CKEDITOR.appendTo`)
are no longer available within `ckeditor_basic.js` and are now provided by `core/creators/themedui.js`.

---

The `iconOffset` property used in button definitions must now point to the
exact offset position of the image in the icon file, instead of its logical order.

For example, in v3 its value could be set to `2`. Now, in that same case,
it should be set to `-32 (2 x -16)`.

---

The default value for `CKEDITOR.config.toolbarCanCollapse` was changed to `false`.

---

The default value for `CKEDITOR.config.docType` is now `'<!DOCTYPE html>'`,
the HTML5 doctype.

---

The `CKEDITOR.editor#getThemeSpace` method was moved to `CKEDITOR.editor#space`.

The `CKEDITOR.editor#themeSpace` event was replaced with `CKEDITOR.editor#uiSpace`.

---

The `CKEDITOR.htmlParser.fragment.fromHtml( fragmentHtml, fixForBody, /** @type {CKEDITOR.htmlParser.element} */ contextNode )` method changed signature to `CKEDITOR.htmlParser.fragment.fromHtml( fragmentHtml, /** @type {CKEDITOR.htmlParser.element/String} */ parent, fixForBody )`.

---

In the `CKEDITOR.editor#paste` event, the `evt.data.html` and `evt.data.text` properties are not available anymore.
They were replaced with `evt.data.dataValue` and `evt.data.type` to help identify the data type.

---

The `CKEDITOR.replaceByClassEnabled` option is not available anymore. It is now enough to set `CKEDITOR.replaceClass` to empty/null to disable the auto-replace.

---

`CKEDITOR.dtd.$captionBlock` was removed. In order to check if one element can appear inside a table caption, use the DTD check instead:

	assert.isTrue( !!CKEDITOR.dtd.caption[ element.getName() ] );
