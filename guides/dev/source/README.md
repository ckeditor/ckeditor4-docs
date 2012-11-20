# Getting the Source Code

Working with the source code of CKEditor may be useful. These are some possible situations that you may face:

 * You're developing plugins or skins, so you can build your own distributions.
 * You're assembling and editor "by hand", by adding plugins and skins to it manually.
 * You want to understand better the CKEditor API by simply reading the code.
 * You want to fix an issue. (Yes, do it!)


## Cloning from GitHub

The CKEditor source code is available in the [ckeditor-dev](https://github.com/ckeditor/ckeditor-dev) git repository, hosted at GitHub.

Having git installed in your system, it's enough to call the following at the command line to have your local copy:

	git clone https://github.com/ckeditor/ckeditor-dev.git

It'll download the full CKEditor development code into the `ckeditor-dev` folder.

## Performance

Note that the source code version of CKEditor is not optimized for production websites. It works flawlessly on a local computer or network, but a simple sample file can download more than two hundred files and more than one megabyte.

Because of this **do not use the source code version of CKEditor in production websites**.

Once your local development is completed, be sure to [build CKEditor](#!/guide/dev_build), making it perfect for distribution.