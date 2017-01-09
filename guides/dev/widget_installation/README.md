<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Installing Widgets

<p class="requirements">
	This feature was introduced in <strong>CKEditor 4.3</strong>. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="http://ckeditor.com/download">Download</a> site and <a href="#!/guide/dev_widget_installation">need to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

## Online Builder Installation

All widget plugins are optional. If you want to add them to your CKEditor 4.3+ build, you can do it in two ways.

### Through CKBuilder

The easiest method is to visit the [CKBuilder](http://ckeditor.com/builder) page and find the widget plugins in the **Available Plugins** list on the right. The following widgets were introduced in CKEditor 4.3 and above:

* **[Enhanced Image](http://ckeditor.com/addon/image2)** &ndash; A plugin that lets you add captioned images with "click and drag" resizing.
* **[Mathematical Formulas](http://ckeditor.com/addon/mathjax)** &ndash; A plugin that lets you add mathematical formulas written in TeX.
* **[Placeholder](http://ckeditor.com/addon/placeholder)** &ndash; A plugin that lets you create non-editable text fragments.
* **[Code Snippet](http://ckeditor.com/addon/codesnippet)** &ndash; A plugin that lets you insert rich code snippets with syntax highlighting into editor content.
* **[Code Snippet GeSHi](http://ckeditor.com/addon/codesnippetgeshi)** &ndash; A plugin that lets you insert rich code snippets with GeSHi syntax highlighting engine integrated.
* **[Media Embed](http://ckeditor.com/addon/embed)** &ndash; A plugin that lets you embed media resources (videos, images, tweets, etc.) hosted by other services directly in the editor.
* **[Semantic Media Embed](http://ckeditor.com/addon/embedsemantic)** &ndash; A plugin that lets you embed media resources with semantic output (videos, images, tweets, etc.) hosted by other services directly in the editor.
* **[Upload Image](http://ckeditor.com/addon/uploadimage)** &ndash; A plugin that enables support for uploading images that were dropped or pasted into the editor.
* **[Upload Widget](http://ckeditor.com/addon/uploadwidget)** &ndash; A plugin that implements a base class for creating non-blocking, live upload of files while the user is editing content.

<img src="guides/dev_widget_installation/add_widget_ckbuilder_3.png" alt="Selected Plugins and Available Plugins lists in CKBuilder" width="786" height="491">

Drag the widget plugin that you want to add to the **Selected Plugins** list on the left. All plugin dependencies will be resolved automatically for you and the required plugins will be added by the builder. When you are happy with your configuration, click the **Download** button at the bottom of the CKBuilder page to download your custom build with widget plugins included.

When you install your custom build, you will see that the additional widget plugins (in this example: [Mathematical Formulas](http://ckeditor.com/addon/mathjax)) are available in your CKEditor.

<img src="guides/dev_widget_installation/add_widget_ckbuilder_4.png" alt="A custom CKEditor build with the Mathematical Formulas widget" width="528" height="218">

### Through Add-on Repository

Visit the widget plugin page in the [Add-ons Repository](http://ckeditor.com/addons/plugins/all) and click the "**Add to my editor**" button.

<img src="guides/dev_widget_installation/add_widget_ckbuilder_1.png" alt="Adding a widget plugin to the editor build" width="420" height="186">

When you are ready, click the "**Build my editor**" button on the right to go to CKBuilder. The plugin that you have just added will be counted as "selected".

<img src="guides/dev_plugins/add_plugin_ckbuilder_2.png" alt="Building a custom CKEditor version" width="159" height="234">

Please note that in CKBuilder all plugin dependencies will be resolved automatically for you. You can fine-tune your build and when you are happy with your configuration, click the **Download** button at the bottom of the CKBuilder page to download your custom build with widget plugins included.

## Manual Installation

Last but not least, you can [add widget plugins manually](#!/guide/dev_plugins-section-3) by downloading the `.zip` packages,  adding them to an existing CKEditor 4.3+ installation, and modifying the editor configuration manually. This is not a recommended solution, though, and should only be used by experienced CKEditor developers. Be mindful of widget dependencies!

<p class="tip">
	To avoid the manual installation process <a href="http://ckeditor.com/add/plugin">submit your widget plugins to the Add-ons Repository</a> and encourage third-party developers to do so. In this way you will be able to both give something to the community and get valuable feedback on your work.
</p>
