# CKEditor 4 Official Documentation

This is the official developer documentation project for CKEditor. It uses the customized CKEditor [JSDuck clone](https://github.com/ckeditor/jsduck) for compilation and is available online at <http://docs.ckeditor.com>.

Developer documentation is a part of [CKEditor SDK](http://sdk.ckeditor.com).

## Building the Documentation

Follow the steps listed below to build CKEditor documentation locally.

### Requirements
* [Ruby](https://www.ruby-lang.org)
* Custom CKEditor [JSDuck](https://github.com/ckeditor/jsduck) clone (installation instructions are provided below).

### Building Instructions

Clone this repository locally:

	> git clone git@github.com:ckeditor/ckeditor-docs.git

Go to the `ckeditor-docs` directory and update the submodules:

	> cd ckeditor-docs
	> git submodule update --init

Clone the custom CKEditor [JSDuck repository](https://github.com/ckeditor/jsduck) to a separate folder next to `ckeditor-docs`:

	> cd ..
	> git clone git@github.com:ckeditor/jsduck.git

Checkout the `stable` branch of the `jsduck` repository and install the latest `ckeditor-jsduck-<version>.gem`:

	> cd jsduck
	> git checkout stable
	> gem install ckeditor-jsduck-<version>.gem

Go back to the `ckeditor-docs` repository and execute `build.sh`:

	> sh build.sh

## Developer's Guide

All "Developer's Guide" articles as well as the Plugin, Widget and Skin SDKs are defined in the `guides/` folder, including the `guides.json` file which defines the Table of Contents tree and the meta information.

## API Documentation

The `repos/` folder contains submodules for the repositories currently included in the API documentation. As expected, the API is documented inline in the source code contained in these repositories, and is then integrated into the documentation files.

## Using Local Versions of ckeditor-dev

While the main CKEditor repository for API documents, [ckeditor-dev](https://github.com/ckeditor/ckeditor-dev), is available as a submodule, it is also possible to make the builder use its local copy to avoid submodule limitations and speed up API documentation work. There are two ways to achieve it:

 * Keeping `ckeditor-docs/` and `ckeditor-dev/` folders in the same directory.

 * Setting the `CKEDITOR_DEV_PATH` environment variable to point to your `ckeditor-dev/` folder path.

## License

See the `LICENSE.md` file for licensing details.