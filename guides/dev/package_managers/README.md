# Installing CKEditor with Package Managers

**CKEditor 4.3.3** introduced support for two popular package managers, [Bower](http://bower.io/) and [Composer](https://getcomposer.org/). You can now use them to install CKEditor releases.

<p class="tip">
	Both package managers will install the <code>standard-all</code> CKEditor preset that includes all official CKSource plugins with only those from the Standard installation preset enabled. <a href="http://ckeditor.com/presets">See here</a> for a comparison of packages.<br>
	Additional plugins included in the <code>standard-all</code> preset can be enabled in your configuration by using the <a href="http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-extraPlugins">config.extraPlugins</a> option.
</p>

## Fetching CKEditor with Bower

This article assumes that you have **Bower** already installed and added to your `PATH`. If this is not the case, please follow the [installation guide](http://bower.io/#installing-bower).

### Usage

In order to fetch the most recent build execute the following command:

	bower install ckeditor

By default CKEditor will be placed in the `bower_components/ckeditor` directory.

### Fetching Particular Build Preset

By default only the `standard-all` CKEditor installation preset can be fetched. However, there is a workaround to install a diffrent package using the `#<preset>/<version>` syntax.

For example, if you would like to download the `full` preset of CKEditor 4.3.3, execute the following command:

	bower install ckeditor#full/4.3.3

## Fetching CKEditor with Composer

This article assumes that you have **Composer** already up and running. If this is not the case, please follow [these instructions](https://getcomposer.org/download).

### Usage

In order to fetch the most recent CKEditor 4 build create a `composer.json` file in the directory where you want to install CKEditor. This file should include the  following contents:

	{
		"require": {
			"ckeditor/ckeditor": "4.*"
		}
	}

Then execute the following command:

	composer install
