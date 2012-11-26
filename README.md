# CKEditor 4 Official Documentation

This is the official documentation project of CKEditor. It uses [JSDuck](https://github.com/senchalabs/jsduck) for compilation and is updated nightly at <http://docs.ckeditor.com>.

## Building the Documentation

**Requirements**: [JSDuck](https://github.com/senchalabs/jsduck).

Having this repository locally cloned, be sure to update the submodules:

	> git submodule update --init

Then simply execute build.sh:

	> sh build.sh

## Guides

All guides are defined in the `guides/` folder, including the `guides.json` file, which defines the guides organization and meta information.

## API Documentation

The `repo/` folder contains submodules for the repositories currently involved in the API documentation. As expected, the API is documented inline in these repositories code, being then integrated into the documentation files.

## Using Local Versions of ckeditor-dev

While the main CKEditor repository for API documents, [ckeditor-dev](https://github.com/ckeditor/ckeditor-dev), is available as a submodule, it is also possible to make the builder use a local copy of it, to avoid submodule limitations and speed up API documentation work. There are two ways for it:

 * Having `ckeditor-docs/` and `ckeditor-dev/` folders at the same directory.
 
 * Setting the `CKEDITOR_DEV_PATH` environment variable, pointing to your `ckeditor-dev/` folder path.
 
## License

Copyright (c) 2003-2012, [CKSource](http://cksource.com/) - Frederico Knabben. All rights reserved.

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
