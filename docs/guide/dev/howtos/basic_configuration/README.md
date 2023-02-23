---
category: howtos
order: 20
url: guide/dev_howtos_basic_configuration
menu-title: Basic Configuration
meta-title-short: Basic Configuration
---
<!--
Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Basic Configuration and Customization

The following article contains tips about configuring and customizing CKEditor 4 as well as some references to further, more in-depth guides.

## How Do I Change the Default CKEditor 4 Configuration?

CKEditor 4 is a highly flexible tool that you can easily customize to your needs. If you want to change the editor configuration, refer to the {@link guide/dev/configuration/README Setting CKEditor 4 Configuration} article. Your custom configuration will help you adjust the CKEditor 4 look and feel to the requirements of your project.


## How Do I Find the CKEditor 4 Configuration Settings to Change?

A full listing of configuration settings that you can change in order to customize the editor to your needs can be found in the {@linkapi CKEDITOR.config CKEditor JavaScript API}. Use the methods described in the  {@link guide/dev/configuration/README Setting CKEditor Configuration} article from the Developer's Guide.

Please note that not all configuration setting are available for each CKEditor 4 build. Some of them are provided by plugins that may be missing in your editor installation. You can check which plugins are included in the official presets in this [comparison table](https://ckeditor.com/cke4/presets).


## How Do I Remove Unneeded CKEditor 4 Functionality?

CKEditor 4 is a truly flexible tool with a modular structure — most editor functionality is based on plugins. Some core plugins are necessary for the editor to work or depend on one another, however, there are lots of optional plugins that you can skip when you do not need the functionality that they provide.

Remember that one of the most important {@link guide/dev/best_practices/README CKEditor best practices} is to customize your editor build with online builder and remove unneeded functionality before it makes it to your package. It is a bad practice to download the Full package and then remove plugins or buttons in your configuration. You will only be loading unnecessary stuff without any good reason. Check out the [4 Common CKEditor Installation Mistakes And How To Avoid Them](https://ckeditor.com/blog/4-Common-CKEditor-Installation-Mistakes-And-How-To-Avoid-Them) for a more thorough explanation of this practice.

If you, however, want to disable some functionality that comes from a CKEditor 4 plugin and is still in your build, you can use the {@linkapi CKEDITOR.config#removePlugins} setting to prevent the plugin from loading.

	// Remove one plugin.
	config.removePlugins = 'elementspath';

	// Remove multiple plugins.
	config.removePlugins = 'elementspath,save,font';

Do remember to use the [online builder](https://ckeditor.com/cke4/builder) to download a truly customized version of CKEditor 4!

## How Do I Find Code Examples Showing CKEditor 4 Customization?

{@linkexample index CKEditor Examples} was created to present a broad range of existing features, usage scenarios and customization options for CKEditor 4. Each example contains a short description and references as well as one or more CKEditor 4 instances to play with. Scroll down to the "Get Sample Source Code" of each sample to view the source code ready to copy and implement in your own solution.

The figure below presents one of the CKEditor 4 samples, {@linkexample mathjax Creating Mathematical Formulas with MathJax}, opened in a browser.

<img src="%BASE_PATH%/assets/img/CKEditor_example.png" width="918" alt="One of the CKEditor samples as viewed in Chrome">

## Further Reading

Refer to the following resources for more information about CKEditor 4 configuration:

* {@link guide/dev/configuration/README Setting CKEditor Configuration} explains how and where to configure CKEditor 4 to fit your needs.
* {@link guide/dev/best_practices/README CKEditor Best Practices} presents some important tips about installing, configuring and maintaining your CKEditor 4 installation.
* [4 Common CKEditor Installation Mistakes And How To Avoid Them](https://ckeditor.com/blog/4-Common-CKEditor-Installation-Mistakes-And-How-To-Avoid-Them) discusses why it makes sense to create a custom editor build and how to do it.
