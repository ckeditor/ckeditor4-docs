---
category: installing-components
order: 60
url: guide/dev_widget_installation
menu-title: Installing Widgets
meta-title-short: Installing Widgets
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Installing Widgets

<info-box info="">
    This feature was introduced in <strong>CKEditor 4.3</strong>. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and need to be added to your custom build with <a href="https://ckeditor.com/cke4/builder">online builder</a>, as explained below.
</info-box>

## Online Builder Installation

All widget plugins are optional and depend on the [Widget](https://ckeditor.com/cke4/addon/widget) plugin. If you want to add them to your CKEditor 4.3+ build, you can do it in two ways.

### Through Online Builder

The easiest method is to visit the [online builder](https://ckeditor.com/cke4/builder) page and find the desired widget plugins in the **Available Plugins** list on the right. The following widgets were introduced in CKEditor 4.3 and above:

* **[Easy Image](https://ckeditor.com/cke4/addon/easyimage)** &ndash; A plugin that lets you upload responsive and optimized captioned images delivered from a blazing-fast CDN.
* **[Enhanced Image](https://ckeditor.com/cke4/addon/image2)** &ndash; A plugin that lets you add captioned images with "click and drag" resizing.
* **[Mathematical Formulas](https://ckeditor.com/cke4/addon/mathjax)** &ndash; A plugin that lets you add mathematical formulas written in TeX.
* **[Placeholder](https://ckeditor.com/cke4/addon/placeholder)** &ndash; A plugin that lets you create non-editable text fragments.
* **[Code Snippet](https://ckeditor.com/cke4/addon/codesnippet)** &ndash; A plugin that lets you insert rich code snippets with syntax highlighting into editor content.
* **[Code Snippet GeSHi](https://ckeditor.com/cke4/addon/codesnippetgeshi)** &ndash; A plugin that lets you insert rich code snippets with GeSHi syntax highlighting engine integrated.
* **[Media Embed](https://ckeditor.com/cke4/addon/embed)** &ndash; A plugin that lets you embed media resources (videos, images, tweets, etc.) hosted by other services directly in the editor.
* **[Semantic Media Embed](https://ckeditor.com/cke4/addon/embedsemantic)** &ndash; A plugin that lets you embed media resources with semantic output (videos, images, tweets, etc.) hosted by other services directly in the editor.
* **[Upload Image](https://ckeditor.com/cke4/addon/uploadimage)** &ndash; A plugin that enables support for uploading images that were dropped or pasted into the editor. This plugin is included in Standard and Full presets since CKEditor 4.8.
* **[Upload Widget](https://ckeditor.com/cke4/addon/uploadwidget)** &ndash; A plugin that implements a base class for creating non-blocking, live upload of files while the user is editing content.

{@img assets/img/add_widget_ckbuilder_3.png Selected Plugins and Available Plugins lists in online builder}

Drag the widget plugin that you want to add to the **Selected Plugins** list on the left. All plugin dependencies will be resolved automatically for you and the required plugins will be added by the builder. When you are happy with your configuration, click the **Download** button at the bottom of the online builder page to download your custom build with widget plugins included.

When you install your custom build, you will see that the additional widget plugins (in this example: [Mathematical Formulas](https://ckeditor.com/cke4/addon/mathjax)) are available in your CKEditor.

{@img assets/img/add_widget_ckbuilder_4.png A custom CKEditor build with the Mathematical Formulas widget}

### Through Add-on Repository

Visit the widget plugin page in the [Add-ons Repository](https://ckeditor.com/cke4/addons/plugins/all) and click the "**Add to my editor**" button.

{@img assets/img/add_plugin_ckbuilder_1.png Adding a widget plugin to the editor build}

When you are ready, click the "**Build my editor**" button on the right to go to online builder. The plugin that you have just added will be counted as "selected".

{@img assets/img/add_plugin_ckbuilder_2.png Building a custom CKEditor version}

Please note that in online builder all plugin dependencies will be resolved automatically for you. You can fine-tune your build and when you are happy with your configuration, click the **Download** button at the bottom of the online builder page to download your custom build with widget plugins included.

## Manual Installation

Last but not least, you can {@link guide/dev/plugins/README#manual-installation add widget plugins manually} by downloading the `.zip` packages,  adding them to an existing CKEditor 4.3+ installation, and modifying the editor configuration manually. This is not a recommended solution, though, and should only be used by experienced CKEditor developers. Be mindful of widget dependencies!

<info-box hint="">
    To avoid the manual installation process <a href="https://ckeditor.com/cke4/add/plugin">submit your widget plugins to the Add-ons Repository</a> and encourage third-party developers to do so. In this way you will be able to both give something to the community and get valuable feedback on your work.
</info-box>
