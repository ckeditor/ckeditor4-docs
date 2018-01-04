<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Basic Configuration and Customization

The following article contains tips about configuring and customizing CKEditor as well as some references to further, more in-depth guides.

## How Do I Change the Default CKEditor Configuration?

CKEditor is a highly flexible tool that you can easily customize to your needs. If you want to change the editor configuration, refer to the [Setting CKEditor Configuration](#!/guide/dev_configuration) article. Your custom configuration will help you adjust the CKEditor look and feel to the requirements of your project.


## How Do I Find the CKEditor Configuration Settings to Change?

A full listing of configuration settings that you can change in order to customize the editor to your needs can be found in the {@link CKEDITOR.config CKEditor JavaScript API}. Use the methods described in the  [Setting CKEditor Configuration](#!/guide/dev_configuration) article from the Developer's Guide.

Please note that not all configuration setting are available for each CKEditor build. Some of them are provided by plugins that may be missing in your editor installation. You can check which plugins are included in the official presets in this [comparison table](https://ckeditor.com/cke4/presets).


## How Do I Remove Unneeded CKEditor Functionality?

CKEditor is a truly flexible tool with a modular structure — most editor functionality is based on plugins. Some core plugins are necessary for the editor to work or depend on one another, however, there are lots of optional plugins that you can skip when you do not need the functionality that they provide.

Remember that one of the most important [CKEditor best practices](#!/guide/dev_best_practices) is to customize your editor build with CKBuilder and remove unneeded functionality before it makes it to your package. It is a bad practice to download the Full package and then remove plugins or buttons in your configuration. You will only be loading unnecessary stuff without any good reason. Check out the [4 Common CKEditor Installation Mistakes And How To Avoid Them](https://ckeditor.com/blog/4-Common-CKEditor-Installation-Mistakes-And-How-To-Avoid-Them) for a more thorough explanation of this practice.

If you, however, want to disable some functionality that comes from a CKEditor plugin and is still in your build, you can use the {@link CKEDITOR.config#removePlugins} setting to prevent the plugin from loading.

	// Remove one plugin.
	config.removePlugins = 'elementspath';

	// Remove multiple plugins.
	config.removePlugins = 'elementspath,save,font';

Do remember to use the [CKBuilder online service](https://ckeditor.com/cke4/builder) to download a truly customized version of CKEditor!

## How Do I Find Code Examples Showing CKEditor Customization?

[CKEditor SDK](https://sdk.ckeditor.com/) was created to present a broad range of existing features, usage scenarios and customization options for CKEditor. Each SDK sample contains a short description and references as well as one or more CKEditor instances to play with. Scroll down to the "Get Sample Source Code" of each sample to view the source code ready to copy and implement in your own solution.

The figure below presents one of the CKEditor samples, [Creating Mathematical Formulas](https://sdk.ckeditor.com/samples/mathjax.html), opened in a browser.

<img src="guides/dev_howtos_basic_configuration/ckeditor-SDK-sample.png" width="918" height="763" alt="One of the CKEditor samples as viewed in Firefox">

## Further Reading

Refer to the following resources for more information about CKEditor configuration:

* [Setting CKEditor Configuration](#!/guide/dev_configuration) explains how and where to configure CKEditor to fit your needs.
* [CKEditor Best Practices](#!/guide/dev_best_practices) presents some important tips about installing, configuring and maintaining your CKEditor installation.
* [4 Common CKEditor Installation Mistakes And How To Avoid Them](https://ckeditor.com/blog/4-Common-CKEditor-Installation-Mistakes-And-How-To-Avoid-Them) discusses why it makes sense to create a custom editor build and how to do it.
