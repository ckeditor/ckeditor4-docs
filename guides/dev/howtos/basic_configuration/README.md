<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Basic Configuration and Customization


## How Do I Change the Default CKEditor Configuration?

CKEditor is a highly flexible tool that you can easily customize to your needs. If you want to change the editor configuration, refer to the [Setting Configuration](#!/guide/dev_configuration) page from the Developer's Guide. Your custom configuration will help you adjust the CKEditor look and feel to the requirements of your project.


## How Do I Find the CKEditor Configuration Settings to Change?

A full listing of configuration settings that you can change in order to customize the editor to your needs can be found in the {@link CKEDITOR.config CKEditor JavaScript API}. Use the methods described in the  [Setting Configuration](#!/guide/dev_configuration) article from the Developer's Guide.


## How Do I Remove Unneeded CKEditor Functionality?

CKEditor is a truly flexible tool with a modular structure — most editor functionality is based on plugins. Some core plugins are necessary for the editor to work or depend on one another, however, there are lots of optional plugins that you can skip when you do not need the functionality that they provide.

If you want to disable some functionality that comes from a CKEditor plugin, you can use the {@link CKEDITOR.config#removePlugins} setting to prevent the plugin from loading.

	// Remove one plugin.
	config.removePlugins = 'elementspath';

	// Remove multiple plugins.
	config.removePlugins = 'elementspath,save,font';

You can also use the [CKBuilder Online service](http://ckeditor.com/builder) to download a truly customized version of CKEditor.

## How Do I Find Code Examples Showing CKEditor Customization?

Each CKEditor installation package available on the official download site contains a `samples/` folder.

Once you download CKEditor, open the `samples/index.html` file in your browser to see a list of samples presenting a broad range of usage scenarios and customization options for CKEditor. Each sample contains a short description along with a code snippet as well as one or more CKEditor instances to play with.

If you are interested in learning how to create your own code to embed, configure, and customize CKEditor, have a look at the source code of the sample pages.

The figure below presents one of the CKEditor samples, Massive inline editing (`inlineall.html`), opened in a browser.

{@img inlineall.png One of the CKEditor samples as viewed in Google Chrome}