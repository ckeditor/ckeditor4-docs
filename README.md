# CKEditor 4 Official Documentation

## ⚠️ CKEditor 4: End of Life and Extended Support Model until Dec 2026

CKEditor 4 was launched in 2012 and reached its End of Life (EOL) on June 30, 2023.

A special edition, **[CKEditor 4 LTS](https://ckeditor.com/ckeditor-4-support/)** ("Long Term Support"), is available under commercial terms (["Extended Support Model"](https://ckeditor.com/ckeditor-4-support/)) for anyone looking to **extend the coverage of security updates and critical bug fixes**.

With CKEditor 4 LTS, security updates and critical bug fixes are guaranteed until December 2026.

## About this repository

This is the official developer documentation project for CKEditor. It uses the customized CKEditor [JSDuck clone](https://github.com/ckeditor/jsduck) for compilation and is available online at <http://docs.ckeditor.com>.

**All issues regarding CKEditor 4 Documentation should be reported in the [`ckeditor4` repository](https://github.com/ckeditor/ckeditor4/issues/new/choose).**

## Building the Documentation

Follow the steps listed below to build CKEditor documentation locally.

### Requirements

* [Ruby](https://www.ruby-lang.org)
* Java ([JRE](https://java.com) or [OpenJDK](https://openjdk.java.net))
* [Node.js](https://nodejs.org/en)
* [NPM](https://www.npmjs.com)
* [grunt-cli](https://github.com/gruntjs/grunt-cli)
* Custom CKEditor [JSDuck](https://github.com/ckeditor/jsduck) clone (installation instructions are provided below)

In order to avoid `root` privileges issues, it is advised to use [rvm](https://rvm.io/rvm/install) to manage Ruby versions and gems. In a similar manner, [nvm](https://github.com/nvm-sh/nvm) should be used to manage Node.js and npm installations. Finally, install `grunt-cli` globally with `npm i -g grunt-cli`.

### Building Instructions

Instructions provided below were tested on following versions of software:

* ruby      v3.0.0
* openjdk   v11.0.11
* Node.js   v14.17.0
* npm       v6.14.13
* grunt-cli v1.4.2

Clone this repository locally:

	> git clone git@github.com:ckeditor/ckeditor4-docs.git

Go to the `ckeditor4-docs` directory and update the submodules:

	> cd ckeditor4-docs
	> git submodule update --init --recursive

Clone the custom CKEditor [JSDuck repository](https://github.com/ckeditor/jsduck) to a separate folder next to `ckeditor4-docs`:

	> cd ..
	> git clone git@github.com:ckeditor/jsduck.git

Checkout the `stable` branch of the `jsduck` repository and install the latest `ckeditor-jsduck-<version>.gem`:

	> cd jsduck
	> git checkout stable
	> gem install ckeditor-jsduck-<version>.gem

Gems versions are listed [here](https://github.com/ckeditor/jsduck#customizations). Gem installation might take a few minutes.

It may be helpfull to add `-- --with-cflags="-Wno-error=implicit-function-declaration"` to gem installation command if further doc generation fails:

	> gem install ckeditor-jsduck-<version>.gem -- --with-cflags="-Wno-error=implicit-function-declaration"

Go back to the `ckeditor4-docs` repository and install [npm dependencies](package.json):

	> cd ../ckeditor4-docs
	> npm install

Then finally execute `grunt build-serve`:

	> grunt build-serve [--options]

:warning: **Too many open files**

You might encounter such error on `umberto` task. Run `ulimit -n 65535` (or any higher value that is permitted by hard limit `ulimit -Hn`) in order to increase the limit of max open files.

Available options:

* `--dev` - use it to build documentation and view it locally,
* `--skipApi` - skips rendering API docs,
* `--skipValidation` - skips link validation,
* `--clean` - when `--dev` flag is used, `--clean` enables to clear the `build` directory before outputting new documentation

Use `grunt docs` to build documentation without setting a server.

## API Documentation

The `repos/` folder contains submodules for the repositories currently included in the API documentation. As expected, the API is documented inline in the source code contained in these repositories, and is then integrated into the documentation files.

## Using Local Versions of ckeditor4

While the main CKEditor repository for API documents, [ckeditor4](https://github.com/ckeditor/ckeditor4), is available as a submodule, it is also possible to make the builder use its local copy to avoid submodule limitations and speed up API documentation work. There are two ways to achieve it:

 * Keeping `ckeditor4-docs/` and `ckeditor4/` folders in the same directory.

 * Setting the `CKEDITOR_DEV_PATH` environment variable to point to your `ckeditor4/` folder path.

## License

See the `LICENSE.md` file for licensing details.
