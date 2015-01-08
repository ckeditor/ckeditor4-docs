<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

#Setting CKEditor Configuration

CKEditor comes with a rich set of configuration options that make it possible to customize its appearance, features, and behavior. The main configuration file is named `config.js`. This file can be found in the root of the CKEditor installation folder.

## Available Configuration Options

All available configuration options can be found in the API documentation. Refer to the {@link CKEDITOR.config} object definition.

## Defining Configuration In-Page

The best way to set the CKEditor configuration is in-page, when creating editor instances. This method lets you avoid modifying the original distribution files in the CKEditor installation folder, making the upgrade task easier.

In-page settings can be passed to any of the editor instance creation functions, namely CKEDITOR#replace and CKEDITOR#appendTo. For example:

	CKEDITOR.replace( 'editor1', {
		language: 'fr',
		uiColor: '#9AB8F3'
	});

Note that the configuration options are passed through a literal object definition (starting with a "`{`" symbol and ending with a "`}`" symbol). Because of this the proper syntax for each option is <code><i>configuration name</i> : <i>configuration value</i></code>. Be sure to not use the "equal" character (`=`) in place of the colon character (`:`).

## Using the config.js File

CKEditor settings can also be configured by using the `config.js` file. By default this file is mostly empty. To change CKEditor configuration, add the settings that you want to modify to the `config.js` file. For example:

	CKEDITOR.editorConfig = function( config ) {
		config.language = 'fr';
		config.uiColor = '#AADC6E';
	};

In order to apply the configuration settings, the CKEDITOR.editorConfig function must always be defined. The `config.js` file will be executed in the scope of your page, so you can also make references to variables defined in-page or even in other JavaScript files.

## Using a Custom Configuration File

Using a custom configuration file is another recommended method of setting CKEditor configuration. Instead of using the default `config.js` file, you can create a copy of that file anywhere in your website and simply point the editor instances to load it. The advantage of this approach is that in this way you can avoid changing the original file, which makes it easier to upgrade CKEditor later by simply overwriting all files.

Suppose you copied the `config.js` file to a folder named `custom` in the root of your website. You also renamed the file to `ckeditor_config.js`. At that point it is enough to only set the {@link CKEDITOR.config#customConfig customConfig} configuration option when creating the editor instances to use the customized settings defined in the file. For example:

	CKEDITOR.replace( 'editor1', {
		customConfig: '/custom/ckeditor_config.js'
	});

The custom configuration file must look just like the default `config.js` file.

## Configuration Loading Order

You are not required to only use one of the above configuration options. The methods described above can be mixed and the configuration will be loaded properly. The following list presents the configuration loading order used when creating an editor instance:

 * An editor instance is created. At this point all its default configuration options are set.
 * If the `customConfig` setting has been set "in-page", that file is loaded, otherwise the default `config.js` file is loaded. All settings in the custom configuration file override current instance settings.
 * If the settings loaded in step 2 also define a new `customConfig` value, another custom configuration file is loaded and its settings override current instance settings. This happens recursively for all files until no `customConfig` is defined.
 * Finally the settings defined "in-page" override current instance settings (except `customConfig`, which has been used in step 1).

## Avoiding Loading External Settings Files

It is also possible to completely avoid loading an external configuration file, reducing the number of files loaded. To do that, you need to set the {@link CKEDITOR.config#customConfig} setting to an empty string. For example:

	CKEDITOR.replace( 'editor1', {
		customConfig: ''
	});

This setting is definitely recommended, if you are not setting the configuration in the `config.js` file nor a custom configuration file.

## Editor Features

If you are wondering what CKEditor features are available, head to the [Functionality Overview](#!/guide/dev_features) section. You will find a many editor features categorized and explained there, along with references to configuration options that let you customize them.

The Functionality Overview section is complemented by [CKEditor SDK](http://sdk.ckeditor.com), an awesome collection of **working editor samples** that present all concepts discussed there and what is even more compelling, let you **download the source code** of each example with just one button click, ready to copy and paste into your own CKEditor implementation!