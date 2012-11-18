# Dedicated Browser Hacks

Skins are basically CSS styling on the DOM structure that represents the editor.
Fortunately the world is going into a direction where browsers are aligning
their CSS features to standards, which makes it easier to design CSS that works
everywhere.

But still the world is not perfect and we have small differences on CSS among
browsers. Additionally, CKEditor must support ancient browsers, which are more
limited and buggy.

To make it easier to maintain the skin CSS, CKEditor makes it possible to define
browser specific files, which hold all "hacks" necessary for them. For example,
a skin can contain the <code>editor_ie.css</code> file with all IE hacks or
<code>dialog_opera.css</code> for Opera specific stuff.

A skin must instruct CKEditor to load, for example, <code>editor_ie.css</code>
instead of <code>editor.css</code> on IE browsers. This must be done by setting
the <code>CKEDITOR.skin.ua_editor</code> value to the list of "browser files"
available. The same can be done for <code>dialog.css</code>. Check out the
<code>skin.js</code> file of the [Moono skin](#!/guide/skin_sdk_intro-section-2)
for a real example.

