# Package Managers

With 4.3.3 version we've introduced Bower and Composer support for our release builds.

Currently there is only **standard-all** preset available, which has all our core plugins available but only few of them are enabled by default.

## Fetching CKEditor with Bower

We assume that you have **Bower** alredy installed and added to your PATH, if not please follow this [installation guide](http://bower.io/#installing-bower).

#### Basic usage

In order to fetch most up-to-date build execute following command line:

	bower install ckeditor

That's it - by default CKEditor will be placed in **bower_components/ckeditor** directory.

#### Fetching particular build preset

Though we don't support directly fetching any other presets than **standard-all**. However there is a workaround to install diffrent package using ```#<preset>/<version>``` syntax. For example, if you'd like to download CKEditor in 4.3.3 version, with **full** preset, you'd execute following command:

	bower install ckeditor#full/4.3.3

## Fetching CKEditor with Composer

We assume that you have **Composer** already up and running, if not please follow [these instructions](https://getcomposer.org/download).

#### Basic usage

To fetch most up-to-date CKEditor 4 create ```composer.json``` file with following contents:

	{
		"require": {
			"ckeditor/ckeditor": "4.*"
		}
	}

Then execute following command:

	composer install
	
