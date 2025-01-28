---
category: advanced-concepts
order: 120
url: guide/skin_sdk_browser_hacks
menu-title: Browser Hacks
meta-title-short: Browser Hacks
---
<!--
Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Dedicated Browser Hacks

Skins are basically CSS styling on the DOM structure that represents the editor. Fortunately the world is going into a direction where browsers are aligning their CSS features to standards, which makes it easier to design CSS that works everywhere.

But still the world is not perfect and we have small differences on CSS among browsers. Additionally, CKEditor 4 must support ancient browsers, which are more limited and buggy.

To make it easier to maintain the skin CSS, CKEditor 4 makes it possible to define browser specific files, which hold all "hacks" necessary for them. For example, a skin can contain the `editor_ie.css` file with all IE hacks or `dialog_opera.css` for Opera specific stuff.

A skin must instruct CKEditor 4 to load, for example, `editor_ie.css` instead of `editor.css` on IE browsers. This must be done by setting the {@linkapi CKEDITOR.skin.ua_editor CKEDITOR.skin.ua_editor} value to the list of "browser files" available. The same can be done for `dialog.css`. Check out the `skin.js` file of the {@link guide/skin_sdk/intro/README#the-moono-lisa-skin Moono-Lisa skin} for a real example.

