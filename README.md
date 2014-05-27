# CKEditor 4 Official Documentation

This is the official developer documentation project for CKEditor. It uses our customized [JSDuck clone](https://github.com/ckeditor/jsduck) for compilation and is updated nightly at <http://docs.ckeditor.com>.

## Building the Documentation

**Requirements**:
* [Ruby](https://www.ruby-lang.org)
* Our custom [JSDuck](https://github.com/ckeditor/jsduck) clone (installation instructions are provided below).

**Follow the steps listed below to build CKEditor documentation:**

Clone this repository locally:

	> git clone git@github.com:ckeditor/ckeditor-docs.git

Go to the `ckeditor-docs` directory and update the submodules:

	> cd ckeditor-docs
	> git submodule update --init

Clone our [JSDuck repository](https://github.com/ckeditor/jsduck) to a separate folder next to `ckeditor-docs`:

	> cd ..
	> git clone git@github.com:ckeditor/jsduck.git

Checkout the `stable` branch of the `jsduck` repository and install the latest `ckeditor-jsduck-<version>.gem`:

	> cd jsduck
	> git co stable
	> gem install ckeditor-jsduck-<version>.gem

Go back to the `ckeditor-docs` repository and execute `build.sh`:

	> sh build.sh

## Developer's Guide

All Developer's Guide articles are defined in the `guides/` folder, including the `guides.json` file which defines the Table of Contents tree as well as the meta information.

## API Documentation

The `repos/` folder contains submodules for the repositories currently included in the API documentation. As expected, the API is documented inline in the source code contained in these repositories, and is then integrated into the documentation files.

## Using Local Versions of ckeditor-dev

While the main CKEditor repository for API documents, [ckeditor-dev](https://github.com/ckeditor/ckeditor-dev), is available as a submodule, it is also possible to make the builder use its local copy to avoid submodule limitations and speed up API documentation work. There are two ways to achieve it:

 * Keeping `ckeditor-docs/` and `ckeditor-dev/` folders in the same directory.

 * Setting the `CKEDITOR_DEV_PATH` environment variable to point to your `ckeditor-dev/` folder path.

## License

Copyright (c) 2003-2014, [CKSource](http://cksource.com/) - Frederico Knabben. All rights reserved.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
