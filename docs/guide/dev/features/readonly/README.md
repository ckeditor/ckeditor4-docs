---
category: api-usage
order: 20
url: guide/dev_readonly
menu-title: Read-Only Mode
meta-title-short: Read-Only Mode
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Read-Only Mode

CKEditor API makes it possible to **render the editor content read-only** (and thus impossible for the user to edit). Some editor features that will not cause the user to modify the content will still be available, though. This includes, for example, the view of the content source code or features such as preview and editor interface maximization within the browser window.

The most crucial element of the API is the {@linkapi CKEDITOR.editor#setReadOnly setReadOnly()} method which puts the editor into the read-only state and restores it to the editable state.

When the editor goes from the editable into the read-only state, its {@linkapi CKEDITOR.editor#readOnly readOnly} property is being set to `true` (for read-only mode) or `false` (for editable mode). The {@linkapi CKEDITOR.editor#readOnly readOnly} event is also fired after each change of the `readOnly` property.

This is what CKEditor looks like when it is in read-only mode.

{@img assets/img/readonly_01.png}

## Read-Only Mode on Startup

CKEditor can be configured to open in the read-only mode on startup by setting the {@linkapi CKEDITOR.config.readOnly CKEDITOR.config.readOnly} configuration option to `true`. For example:

    config.readOnly = true;

The same can be achieved by setting the `disabled` attribute for the `<textarea>` element that CKEditor replaces.

## Read-Only Mode Demo

See also the {@linksdk readonly working "Read-Only Mode" sample} that showcases toggling between the read-only and editable mode.
