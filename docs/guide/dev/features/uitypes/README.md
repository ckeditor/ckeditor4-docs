---
category: editor-ui
order: 20
url: guide/dev_uitypes
menu-title: UI Types
meta-title-short: UI Types
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Editor User Interface Types

Due to inherent differences between two editor types (classic and inline) dedicated solutions for the editor user interface are required. CKEditor thus comes with two UI versions:

* **Fixed UI** &ndash; a static user interface used by default in {@link guide/dev/framed/README classic editor}.
* **Floating UI** &ndash; a dynamic user interface used by default by {@link guide/dev/inline/README inline editor}.

## Fixed User Interface

In fixed UI, used by default in classic editor:

* The editor toolbar is always visible.
* The toolbar and bottom bar location is static and does not change.
* The editing area takes a predefined amount of space, regardless of the size of the content inside.

The **default behavior of an editor with fixed UI can be customized**, though:

* {@link guide/dev/features/toolbarlocation/README Toolbar position} can be configured with the {@linkapi CKEDITOR.config.toolbarLocation CKEDITOR.config.toolbarLocation} option.
* The editing area size can be adjusted automatically also when fixed UI is used &mdash; check the {@link guide/dev/features/autogrow/README Auto Grow} feature.
* The editor size can be controlled manually by using the resize handle located at the bottom of the interface. This feature is provided through the [Editor Resize](https://ckeditor.com/cke4/addon/resize) plugin and is available in Standard and Full editor distributions.

<img src="%BASE_PATH%/assets/img/classic_example.png" alt="Classic editor with fixed UI">

### Fixed UI for Inline Editor

<info-box info="">
 This feature is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

Although fixed UI is mostly used in conjunction with classic editor, it is also possible to implement it with inline editor. This is done through the optional [Div Editing Area](https://ckeditor.com/cke4/addon/divarea) plugin. **Using this plugin has a few of drawbacks**, though:

* Under the hood, the element replaced by CKEditor is hidden automatically and a `<div>`-based editor is created next to it. This might affect the styles of content inside the editor, e.g. because of the lack of original element ID attribute used by CSS selectors.
* The `<div>`-based editor is rendered using multiple nested `<div>` elements. This might affect editor content styles, too.
* Last but not least, the {@link guide/dev/features/autogrow/README Auto Grow} feature is not fully supported in this scenario &mdash; the value of the {@linkapi CKEDITOR.config.autoGrow_minHeight CKEDITOR.config.autoGrow_minHeight} option is ignored.

If you want to achieve a fixed UI experience with inline editor, consider using the {@link guide/dev/features/sharedspace/README Shared Toolbar and Bottom Bar} feature instead, where these limitations do not exist.

## Floating User Interface

In floating UI, used by default in inline editor:

* The editor toolbar is only shown when the editor is focused.
* The toolbar location changes dynamically to ensure that the toolbar is always available.
* The size of the editing area is determined by the size of the content inside.

<info-box info="">
	Floating UI is not available for classic editor.
</info-box>

If you open a page that contains an inline editor instance you will see that the toolbar is shown on demand and it moves dynamically on the page adjusting itself to the viewport and a page element that is focused.

<img src="%BASE_PATH%/assets/img/inline_example.png" alt="Inline editor with floating UI">

Due to the dynamic nature of floating UI, **some editor features are unavailable**:

* [Elements Path](https://ckeditor.com/cke4/addon/elementspath) is not available &mdash; to use it in an inline editor you need to implement fixed UI with the [Div Editing Area](https://ckeditor.com/cke4/addon/divarea) plugin or the {@link guide/dev/features/sharedspace/README shared toolbar and bottom bar} that comes with the [Shared Space](https://ckeditor.com/cke4/addon/sharedspace) plugin.
* [Source Editing Area](https://ckeditor.com/cke4/addon/sourcearea) is not available &mdash; an alternative solution using a [dialog window for source code editing](https://ckeditor.com/cke4/addon/sourcedialog) should be used. Refer to the {@link guide/dev/features/sourcearea/README Source Code Editing} documentation.
* The following configuration options that control the size of the editor are ignored: {@linkapi CKEDITOR.config.height CKEDITOR.config.height} and {@linkapi CKEDITOR.config.width CKEDITOR.config.width}

## User Interface Types Demo

The following samples are available for two CKEditor user interface types:

* The {@linksdk fixedui Fixed User Interface} sample shows the implementation of fixed UI with both classic and inline editor.
* The {@linksdk floatingui Floating User Interface} sample shows an inline editor instance with its default floating UI.

## Related Features

* {@link guide/dev/features/sharedspace/README Shared Toolbar and Bottom Bar} &ndash; configuring multiple editor instances (both classic and inline) to share the same toolbar and bottom bar.
* {@link guide/dev/features/toolbarlocation/README Toolbar Location} &ndash; changing toolbar position for fixed user interface.
