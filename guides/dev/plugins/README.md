<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Installing Plugins

CKEditor has plugin-based architecture. In fact, initially the editor core is an empty box, which is then filled with features provided by plugins. Even the editor interface, like toolbars, buttons, and the editing area, are plugins, too!

The default installation of CKEditor (that you are probably using now) includes a selection of plugins. At any moment you can enrich your editor with additional plugins and as a result, bring new useful features to your users.

## Where to Look for Plugins?

The [CKEditor Add-ons Repository](https://ckeditor.com/cke4/addons/plugins/all) is an online service designed to find and share editor plugins. Its structure, with plugin categories, comprehensive descriptions, and screenshots, makes it easy to understand the plugin features and the comment system lets you socialize with the CKEditor community or provide instant feedback. If you are a plugin developer, the repository is also the best place to showcase your skills and reach a large user base.

## Online Builder Installation

If you found some interesting plugins in the Add-ons Repository, you can easily add them to your custom build.

### Through CKBuilder

The easiest method is to visit the [CKBuilder](https://ckeditor.com/cke4/builder) page and find the plugins that you wish to have in the **Available Plugins** list on the right.

<img src="guides/dev_plugins/add_plugin_ckbuilder_3.png" alt="Selected Plugins and Available Plugins lists in CKBuilder" width="778" height="494">

Drag the plugins that you want to add to the **Selected Plugins** list on the left. All plugin dependencies will be resolved automatically for you and the required plugins will be added by the builder. When you are happy with your configuration, click the **Download** button at the bottom of the CKBuilder page to download your custom build with all selected plugins included.

When you install your custom build, you will see that the additional plugins (in this example: [Language](https://ckeditor.com/cke4/addon/language)) are available in your CKEditor.

<img src="guides/dev_plugins/add_plugin_ckbuilder_4.png" alt="A custom CKEditor build with the Language plugin" width="502" height="205">

### Through Add-on Repository

Visit the plugin page in the [Add-ons Repository](https://ckeditor.com/cke4/addons/plugins/all) and click the "**Add to my editor**" button.

<img src="guides/dev_plugins/add_plugin_ckbuilder_1.png" alt="Adding a plugin to the editor build" width="416" height="146">

When you are ready, click the "**Build my editor**" button on the right to go to CKBuilder. The plugin that you have just added will be counted as "selected".

<img src="guides/dev_plugins/add_plugin_ckbuilder_2.png" alt="Building a custom CKEditor version" width="159" height="234">

Please note that in CKBuilder all plugin dependencies will be resolved automatically for you. You can fine-tune your build and when you are happy with your configuration, click the **Download** button at the bottom of the CKBuilder page to download your custom build with selected plugins included.

## Manual Installation

Using CKBuilder is a recommended solution, however, if you have plugins developed by yourself or by third parties, you can add plugins to your local installation manually by following the steps described below:

1. **Extract** the plugin `.zip` archive.

2. **Copy** the plugin files to the `plugins` folder of your CKEditor installation. Each plugin must be placed in a sub-folder that matches its "technical" name.

	For example, the [Language plugin](https://ckeditor.com/cke4/addon/language) would be installed into this folder: `<CKEditor folder>/plugins/language`.

3. **Check and resolve plugin dependencies.** If a plugin needs others to work, you will need to add these manually as well.

4. **Enable the plugin.** Use the {@link CKEDITOR.config#extraPlugins extraPlugins} setting to add the plugin to your confiuration:

		config.extraPlugins = 'language';

	If a plugin has any dependencies, you will need to enable these, too.

Your plugin will now be available in your CKEditor installation.

<p class="tip">
	To avoid the manual installation process <a href="https://ckeditor.com/cke4/add/plugin">submit your plugins to the Add-ons Repository</a> and encourage third-party developers to do so. In this way you will be able to both give something to the community and get valuable feedback on your work.
</p>
