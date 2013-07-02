# Installation

Installing CKEditor is easy. Choose the appropriate procedure
(fresh install or upgrade) and follow the steps described below.

## Fresh Installation

To install CKEditor for the first time, proceed in the following way:

 1. **Download** the latest version from the CKEditor website: <http://ckeditor.com/download>
 2. **Extract** (decompress) the downloaded archive to a directory called `ckeditor` in the root of your website.

You can place the files in any path of your website. The `ckeditor` directory is the default one.

## Upgrade

To upgrade an existing CKEditor installation, proceed in the following way:

 1. **Rename** your old editor folder to a backup folder, for example `ckeditor_old`.
 2. **Download** the latest version from the CKEditor website: <http://ckeditor.com/download>
 3. **Extract** (decompress) the downloaded archive to the original editor directory, for example `ckeditor`.
 4. **Copy** all configuration files that you have changed from the backup directory to their corresponding positions in the new directory. These could include (but are not limited to) the following files: 
	* `config.js`
	* `contents.css`
	* `styles.js`

## Verification of the Installation

CKEditor comes with sample pages that can be used to verify that the installation succeeded. In order to see whether the editor is working correctly, take a look at the `samples` directory.

To test your installation, call the following main samples page at your website:  
`http://<your site>/<CKEditor installation path>/samples/index.html`

For example:  
`http://www.example.com/ckeditor/samples/index.html`
