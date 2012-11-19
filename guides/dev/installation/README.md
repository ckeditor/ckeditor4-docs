# Installation

Installing CKEditor is easy. In order to install the editor, choose an appropriate procedure
(fresh install or upgrade) and follow the steps described below.

## Fresh Installation

To install CKEditor for the first time, proceed in the following way:

 1. **Download** the latest version of the editor from our website: <http://ckeditor.com/download>
 2. **Extract** (decompress) the downloaded archive to a directory called ckeditor in the root of your website.

You can place the files in any path of your website. The `ckeditor` directory is the default one.

## Upgrade

To upgrade an existing CKEditor installation, proceed in the following way:

 1. **Rename** your old editor folder to a backup folder, for example `ckeditor_old`.
 2. **Download** the latest version of the editor from our website: <http://ckeditor.com/download>
 3. **Extract** (decompress) the downloaded archive to the original editor directory, for example ckeditor.
 4. **Copy** all configuration files that you have changed from the backup folder to their corresponding position in the new directory. These could include (but do not have to be limited to) the following files: 
	* `config.js`
	* `contents.css`
	* `plugins/templates/templates/default.js`
	* `plugins/styles/styles/default.js`
	* `plugins/pastefromword/filter/default.js`

## Verification of the Installation

CKEditor comes with a few sample pages that can be used to verify that installation proceeded properly.
In order to see whether the editor is working, take a look at the `_samples` directory.

To test your installation, call the following page at your website:  
`http://<your site>/<CKEditor installation path>/_samples/index.html`

For example:  
`http://www.example.com/ckeditor/_samples/index.html`
