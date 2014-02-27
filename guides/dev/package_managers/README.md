# Installing CKEditor with Package Managers

**CKEditor 4.3.3** introduced support for two popular package managers, [Bower](http://bower.io/) and [Composer](https://getcomposer.org/). You can now use them to install CKEditor releases.

<p class="tip">
	Both package managers will install the <code>standard-all</code> CKEditor preset that includes all official CKSource plugins with only those from the Standard installation preset compiled into the <code>ckeditor.js</code> file and enabled. <a href="http://ckeditor.com/presets">See here</a> for a comparison of packages.<br><br>
	Additional plugins included in the <code>standard-all</code> preset can be enabled in your configuration by using the <a href="#!/api/CKEDITOR.config-cfg-extraPlugins">config.extraPlugins</a> option.
</p>

## Bower

This article assumes that you have **Bower** already installed and added to your `PATH`. If this is not the case, please follow the [installation guide](http://bower.io/#installing-bower).

### Usage

In order to fetch the most recent build execute the following command:

	bower install ckeditor

By default CKEditor will be placed in the `bower_components/ckeditor` directory.

### Adding CKEditor as dependency using a `bower.json` file

You may add CKEditor to dependency list inside your `bower.json` file. Just make sure to create a reference to `ckeditor` in the `dependencies` property.

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

In order to fetch the most recent CKEditor 4 build create a `composer.json` file in the directory where you want to install CKEditor. This file should include the  following contents:

	{
		"require": {
			"ckeditor/ckeditor": "4.*"
		}
	}

Then execute the following command:

	composer update

### Fetching Particular Build Preset

There is a way for Composer to fetch CKEditor built with a desired preset. For each preset you can subscribe following branches:

1. latest release
2. stable release
3. latest minor release for given major version

Following table will explain relation between build and a json `require` value:

preset: | standard-all | basic | standard | full
 --- | --- | --- | --- | --- 
latest | dev-latest | dev-basic/latest | dev-standard/latest | dev-full/latest
stable | dev-stable | dev-basic/stable | dev-standard/stable | dev-full/stable
4.3.x | dev-4.3.x | dev-basic/4.3.x | dev-standard/4.3.x | dev-full/4.3.x

Lets consider that we want to include most up-to-date `4.3.x` release, in such case our `composer.json` file should look like:

	{
		"require": {
			"ckeditor/ckeditor": "dev-full/4.3.x"
		}
	}

Note: Only branches since `4.3.x` and higher are supportet that way.

## Customize configuration

It's not a good practice to edit `config.js` file in directory maintained by any package manager, because it will cause conflicts during update. You should consider using two strategies:

* [inline configuration](http://docs.ckeditor.com/#!/guide/dev_configuration-section-defining-configuration-in-page)
* [custom configuration file](http://docs.ckeditor.com/#!/guide/dev_configuration-section-using-a-custom-configuration-file)

You'll find both options explained in [Setting CKEditor Configuration](http://docs.ckeditor.com/#!/guide/dev_configuration) guide.