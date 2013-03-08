# CKEditor 4 Official Documentation

This is the official documentation project for CKEditor. It uses [JSDuck](https://github.com/senchalabs/jsduck) for compilation and is updated nightly at <http://docs.ckeditor.com>.

## Building the Documentation

**Requirements**: [JSDuck](https://github.com/senchalabs/jsduck).

After cloning this repository locally, make sure you update the submodules:

	> git submodule update --init

Then simply execute `build.sh`:

	> sh build.sh

## Guides

All guides are defined in the `guides` folder, including the `guides.json` file which defines the guides organization as well as meta information.

## API Documentation

The `repos` folder contains submodules for the repositories currently involved in the API documentation. As expected, the API is documented inline in the code contained in these repositories, and is then integrated into the documentation files.

## Using Local Versions of ckeditor-dev

While the main CKEditor repository for API documents, [ckeditor-dev](https://github.com/ckeditor/ckeditor-dev), is available as a submodule, it is also possible to make the builder use its local copy to avoid submodule limitations and speed up API documentation work. There are two ways to achieve it:

 * Having `ckeditor-docs` and `ckeditor-dev` folders in the same directory.
 
 * Setting the `CKEDITOR_DEV_PATH` environment variable, pointing to your `ckeditor-dev` folder path.
 
## License

Copyright (c) 2003-2013, [CKSource](http://cksource.com/) - Frederico Knabben. All rights reserved.

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
