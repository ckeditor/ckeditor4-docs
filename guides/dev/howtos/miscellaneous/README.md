# Miscellaneous


## How Do I Read or Write the Contents of CKEditor from JavaScript?

If you want to read CKEditor contents, use the {@link CKEDITOR.editor#getData getData} method.

If you want to write some content into CKEditor, use the {@link CKEDITOR.editor#setData setData} method.

An example of how to use these functions can be found in the **Basic usage of the API** sample (`samples/api.html`) located in the `samples/` directory of CKEditor installation package.


## How Do I Know Which Files I Can Remove Before Uploading CKEditor to My Server?

Refer to the [Minimum Setup](#!/guide/dev_minimum_setup) article of [CKEditor 3.x Developer's Guide](#!/guide/dev) for a brief description of all files and folders from the CKEditor installation package as well as information on what can be safely removed before you upload CKEditor files to your production server.


## How Do I Compress CKEditor Source Code After Customization?

The JavaScript code of CKEditor is delivered as one main `ckeditor.js` file where all the code has been compressed and merged. When you customize CKEditor and change its source code, it makes sense to use our package file generator to compress your own code.

... ** TODO ** ...