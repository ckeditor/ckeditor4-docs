<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Installing CKEditor with Package Managers

**CKEditor 4.3.3** introduced support for two popular package managers, [Bower](http://bower.io/) and [Composer](https://getcomposer.org/). You can now use them to install CKEditor releases.

Both package managers will install the <code>standard-all</code> CKEditor preset that includes all official CKSource plugins with only those from the Standard installation preset compiled into the <code>ckeditor.js</code> file and enabled. <a href="http://ckeditor.com/presets">See here</a> for a comparison of packages.

Additional plugins included in the <code>standard-all</code> preset can be enabled in your configuration by using the <a href="#!/api/CKEDITOR.config-cfg-extraPlugins">config.extraPlugins</a> option.

For example, if you wanted to add the **Text Color** and **Background Color** buttons to your toolbar (the Standard preset does not include them by default), you should add the following to your custom editor configuration:

	config.extraPlugins = 'colorbutton';

## Custom CKEditor Configuration

If you want to use package managers to keep CKEditor up to date, your custom editor configuration should not be done in any of the core CKEditor files like `config.js` (otherwise you risk overwriting them during the update process).

It is thus recommended to use of the following strategies:

* [Defining configuration in-page](#!/guide/dev_configuration-section-defining-configuration-in-page).
* [Using a custom configuration file](#!/guide/dev_configuration-section-using-a-custom-configuration-file).

Both options are explained in more detail in the [Setting CKEditor Configuration](http://docs.ckeditor.com/#!/guide/dev_configuration) article.

## Bower

This article assumes that you have **Bower** already installed and added to your `PATH`. If this is not the case, please follow the [installation guide](http://bower.io/#installing-bower).

### Usage

In order to fetch the most recent build execute the following command:

	bower install ckeditor

By default CKEditor will be placed in the `bower_components/ckeditor` directory.

### Adding CKEditor as Dependency Using the `bower.json` File

You may add CKEditor to the dependencies list inside your `bower.json` file. Just make sure to create a reference to `ckeditor` in the `dependencies` property.

	{
		"name": "my-project",
		"dependencies": {
			"ckeditor": "4"
		}
	}

Then execute the following command:

	bower update

### Fetching Particular Build Preset

By default only the `standard-all` CKEditor installation preset can be fetched. However, there is a workaround to install a diffrent package using the `#<preset>/<version>` syntax.

For example, if you would like to download the `full` preset of CKEditor 4.3.3, execute the following command:

	bower install ckeditor#full/4.3.3

## Composer

This article assumes that you have **Composer** already up and running. If this is not the case, please follow [these instructions](https://getcomposer.org/download).

### Usage

In order to fetch the most recent CKEditor 4 build, create a `composer.json` file in the directory where you want to install CKEditor. This file should include the  following contents:

	{
		"require": {
			"ckeditor/ckeditor": "4.*"
		}
	}

Then execute the following command:

	composer update

### Fetching Particular Build Preset

There is a way for Composer to fetch CKEditor built with a desired preset. For each preset you can subscribe to the following branches:

1. Latest release
2. Stable release
3. Latest minor release for a given major version

The following table will explain the relation between a build and the JSON `require` value:

preset | standard-all | basic | standard | full
 --- | --- | --- | --- | --- 
latest | `dev-latest` | `dev-basic/latest` | `dev-standard/latest` | `dev-full/latest`
stable | `dev-stable` | `dev-basic/stable` | `dev-standard/stable` | `dev-full/stable`
4.3.x | `dev-4.3.x` | `dev-basic/4.3.x` | `dev-standard/4.3.x` | `dev-full/4.3.x`

For example, let us consider that we want to include the `full` preset of the most up-to-date `4.3.x` release. In this case the `composer.json` file should contain the following code:

	{
		"require": {
			"ckeditor/ckeditor": "dev-full/4.3.x"
		}
	}

<p class="tip">
	Only branches starting from CKEditor version <strong>4.3.x</strong> and higher are supported in this way.
</p>