---
category: advanced-installation-tasks
order: 100
url: guide/dev_package_managers
menu-title: Using Package Managers
meta-title-short: Using Package Managers
---
<!--
Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Installing CKEditor 4 with Package Managers

<info-box info="">
    Support for <a href="http://bower.io/">Bower</a> and <a href="https://getcomposer.org/">Composer</a> was introduced in <strong>CKEditor 4.3.3</strong> and for <a href="https://www.npmjs.com/">npm</a> in <strong>CKEditor 4.5.7</strong>. Official NuGet packages are available since <strong>CKEditor 4.7.3</strong>.
</info-box>

With the exception of NuGet, by default the package managers will install the `standard-all` CKEditor 4 preset that includes all official CKSource plugins with only those from the Standard installation preset compiled into the `ckeditor.js` file and enabled. [See here](https://ckeditor.com/cke4/presets) for a comparison of editor presets.

Additional plugins included in the `standard-all` preset can be enabled in your configuration by using the {@linkapi CKEDITOR.config#extraPlugins CKEDITOR.config#extraPlugins} option.

For example, if you wanted to add the **Text Color** and **Background Color** buttons to your toolbar (the Standard preset does not include them by default), you should add the following to your custom editor configuration:

	config.extraPlugins = 'colorbutton';

## Custom CKEditor 4 Configuration

If you want to use package managers to keep CKEditor 4 up to date, your custom editor configuration should not be done in any of the core CKEditor files like `config.js` (otherwise you risk overwriting them during the update process).

It is thus recommended to use of the following strategies:

* {@link guide/dev/configuration/README#defining-configuration-in-page Defining configuration in-page}.
* {@link guide/dev/configuration/README#using-a-custom-configuration-file Using a custom configuration file}.

Both options are explained in more detail in the {@link guide/dev/configuration/README Setting CKEditor Configuration} article.

## npm

This article assumes that you have **npm** already installed and added to your `PATH`. If this is not the case, please follow the official [npm installation guide](https://docs.npmjs.com/getting-started/installing-node).

### Usage

In order to fetch the most recent build, execute the following command:

	npm install ckeditor4

The above command will install the `standard-all` preset of CKEditor 4. It is also possible to install a different preset using the `ckeditor/ckeditor4-releases#<BRANCH_NAME>` repository dependency instead of the npm package. The `<BRANCH_NAME>` should then point to the correct [CKEditor4 Release branch](https://github.com/ckeditor/ckeditor4-releases/branches) name, e.g.

	npm install ckeditor/ckeditor4-releases#full/latest

By default CKEditor 4 will be placed in the `node_modules/ckeditor4` directory.

### Adding CKEditor 4 as a Dependency Using the `package.json` File

Using `npm install` command will automatically create a reference to `ckeditor4` in your `package.json` file:

    npm install ckeditor4

You should see the following reference in the `dependencies` property:

```js
{
    "name": "my-project",
    "dependencies": {
        "ckeditor4": "4.13.0"
    }
}
```

Then execute the following command:

	npm update

### Fetching a Particular Build Preset

Currently only the `standard-all` CKEditor 4 installation preset can be fetched.

## Bower

This article assumes that you have **Bower** already installed and added to your `PATH`. If this is not the case, please follow the official [Bower installation guide](http://bower.io/#installing-bower).

### Usage

In order to fetch the most recent build, execute the following command:

	bower install ckeditor

By default CKEditor 4 will be placed in the `bower_components/ckeditor` directory.

### Adding CKEditor 4 as a Dependency Using the `bower.json` File

You may add CKEditor 4 to the dependencies list inside your `bower.json` file. Just make sure to create a reference to `ckeditor` in the `dependencies` property.

```js
{
    "name": "my-project",
    "dependencies": {
        "ckeditor": "4"
    }
}
```

Then execute the following command:

	bower update

### Fetching a Particular Build Preset

By default only the `standard-all` CKEditor 4 installation preset can be fetched. However, there is a workaround to install a diffrent package using the `#<preset>/<version>` syntax.

For example, if you would like to download the `full` preset of CKEditor 4.13.0, execute the following command:

	bower install ckeditor#full/4.13.0

## Composer

This article assumes that you have **Composer** already up and running. If this is not the case, please follow [these instructions](https://getcomposer.org/download).

### Usage

In order to fetch the most recent CKEditor 4 build, create a `composer.json` file in the directory where you want to install CKEditor. This file should include the following contents:

```js
{
    "require": {
        "ckeditor/ckeditor": "4.*"
    }
}
```

Then execute the following command:

	composer update

### Fetching a Particular Build Preset

There is a way for Composer to fetch CKEditor 4 built with a desired preset. For each preset you can subscribe to the following branches:

1. Latest release
2. Stable release
3. Latest minor release for a given major version

The following table will explain the relation between a build and the JSON `require` value:

preset | standard-all | basic | standard | full
 --- | --- | --- | --- | ---
latest | `dev-latest` | `dev-basic/latest` | `dev-standard/latest` | `dev-full/latest`
stable | `dev-stable` | `dev-basic/stable` | `dev-standard/stable` | `dev-full/stable`
4.13.x | `4.13.x-dev` | `dev-basic/4.13.x` | `dev-standard/4.13.x` | `dev-full/4.13.x`

For example, let us consider that we want to include the `full` preset of the most up-to-date `4.13.x` release. In this case the `composer.json` file should contain the following code:

```js
{
    "require": {
        "ckeditor/ckeditor": "dev-full/4.13.x"
    }
}
```

<info-box hint="">
    Only branches starting from CKEditor version <strong>4.3.x</strong> and higher are supported in this way.
</info-box>

## NuGet

This article assumes that you have the **NuGet** command line client already up and running. If this is not the case, please follow [these instructions](https://docs.microsoft.com/en-us/nuget/guides/install-nuget#nuget-cli).

### Supported Packages

The CKEditor team maintains the following NuGet packages:

* [ckeditor-basic](https://www.nuget.org/packages/ckeditor-basic)
* [ckeditor-standard](https://www.nuget.org/packages/ckeditor-standard)
* [ckeditor-standard-all](https://www.nuget.org/packages/ckeditor-standard-all)
* [ckeditor-full](https://www.nuget.org/packages/ckeditor-full)

### Usage

Open your command line in the directory where you would like to install CKEditor, and use the following:

	nuget install <packageID>

e.g.

	nuget install ckeditor-standard

You will find the package installed into a directory like `ckeditor-standard.4.13.0`.
