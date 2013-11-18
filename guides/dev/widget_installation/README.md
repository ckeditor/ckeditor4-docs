# Installing Widgets

[Widget System](#!/guide/dev_widgets) is an innovative feature that was released in [CKEditor 4.3](http://ckeditor.com/blog/CKEditor-4.3-Released). The whole system is built from a few elements, including the [Widget plugin](http://ckeditor.com/addon/widget) that provides the Widget API, the plugins that represent particular widgets as well as some additional utilities that may be required for a given widget to work.

**By default, widgets are not included in the pre-defined editor presets that you can get from the [CKEditor Download](http://ckeditor.com/download) site.** If you want to add a widget to your CKEditor installation, read the instructions below and use [CKEditor Builder](http://ckeditor.com/builder) to add them to your build.

<p class="tip">
	Widgets are available for CKEditor 4.3 and above, so to use them you will need to upgrade your editor version first!
</p>

## Widget Plugin

The [Widget plugin](http://ckeditor.com/addon/widget) is required for all widgets to work. It is responsible for providing the [Widget API](http://docs.ckeditor.com/#!/api/CKEDITOR.plugins.widget) and no widget will work without it. 

### Additional Utilities

To support drag and drop operations for widgets, the Widget plugin requires the [Line Utilities](http://ckeditor.com/addon/lineutils) plugin to work correctly.

## Downloading Widgets

All widget plugins are optional. If you want to add them to your CKEditor 4.3+ build, you can do it in three ways.

### Through Add-on Repository

Visit the widget plugin page in the Add-ons Repository and click the "**Add to my editor**" button.

{@img add_widget_ckbuilder_1.png Adding a widget plugin to the editor build}

When you are ready, click the "**Build my editor**" button on the right to go to CKBuilder. The plugin that you have just added will be counted as "selected".

{@img add_widget_ckbuilder_1.png Building a custom CKEditor version}

Please note that in CKBuilder all plugin dependencies will be resolved automatically for you. You can fine-tune your build and when you are ready, click the **Download** button at the bottom of the CKBuilder page to download your custom build with widget plugins included.

### Through CKBuilder

You can also add the go straight to [CKBuilder](http://ckeditor.com/builder) and find the widget plugins in the **Available Plugins** list on the right. Drag the plugin that you want to add to the **Selected Plugins** list on the left. All plugin dependencies will be resolved automatically for you and the required plugins will be added by the builder. When you are ready, click the **Download** button at the bottom of the CKBuilder page to download your custom build with widget plugins included.

### Manual Installation

Last but not least, you can [add widget plugins manually](#!/guide/dev_plugins-section-3) by downloading the .zip packages,  adding them to an existing CKEditor 4.3+ installation, and modifying the editor configuration manually. This is not a recommended solution, though, and should only be used by experienced CKEditor developers.

