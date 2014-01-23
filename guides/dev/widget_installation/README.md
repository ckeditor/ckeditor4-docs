# Installing Widgets

<div class="tip">
	<p>Widgets are available for CKEditor 4.3 and above, so to use them you will need to upgrade your editor version first!</p>

	<p><strong>By default, widgets are not included in the pre-defined editor presets that you can get from the <a href="http://ckeditor.com/download">CKEditor Download</a> site.</strong> If you want to add a widget to your CKEditor installation, read the instructions below and use <a href="http://ckeditor.com/builder">CKEditor Builder</a> to add them to your build.</p>
</div>

## Online Builder Installation

All widget plugins are optional. If you want to add them to your CKEditor 4.3+ build, you can do it in two ways.

### Through CKBuilder

The easiest method is to visit the [CKBuilder](http://ckeditor.com/builder) page and find the widget plugins in the **Available Plugins** list on the right. The following widgets were introduced together with CKEditor 4.3:

* **[Enhanced Image](http://ckeditor.com/addon/image2)** &ndash; a plugin that lets you add captioned images with "click and drag" resizing.
* **[Mathematical Formulas](http://ckeditor.com/addon/mathjax)** &ndash; a plugin that lets you add mathematical formulas written in TeX.
* **[Placeholder](http://ckeditor.com/addon/placeholder)** &ndash; a plugin that lets you create non-editable text fragments.

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
