<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Dedicated Browser Hacks

Skins are basically CSS styling on the DOM structure that represents the editor. Fortunately the world is going into a direction where browsers are aligning their CSS features to standards, which makes it easier to design CSS that works everywhere.

But still the world is not perfect and we have small differences on CSS among browsers. Additionally, CKEditor must support ancient browsers, which are more limited and buggy.

To make it easier to maintain the skin CSS, CKEditor makes it possible to define browser specific files, which hold all "hacks" necessary for them. For example, a skin can contain the `editor_ie.css` file with all IE hacks or `dialog_opera.css` for Opera specific stuff.

A skin must instruct CKEditor to load, for example, `editor_ie.css` instead of `editor.css` on IE browsers. This must be done by setting the `CKEDITOR.skin.ua_editor` value to the list of "browser files" available. The same can be done for `dialog.css`. Check out the `skin.js` file of the [Moono skin](#!/guide/skin_sdk_intro-section-2) for a real example.

