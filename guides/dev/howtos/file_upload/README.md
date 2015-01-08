<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# File Upload


## How Do I Upload Files or Images Using CKEditor?

By default CKEditor does not include a file browser or uploader. You can, however, create a [custom file browser](#!/guide/dev_file_browse_upload) or use an existing one, like [CKFinder](http://ckfinder.com/).


## How Do I Paste a Local Image from my Clipboard to CKEditor?

It is not possible to paste a local file (like an image) directly to a website located on the server. This issue has nothing to do with CKEditor, but is related to the security model of the Internet browsers.

If you want to add images to your document, you need to upload them to a server first. You can either upload them to a server manually and then insert them using the [Insert Image](http://ckeditor.com/addon/image) feature, giving the URL of the image, or integrate CKEditor with a [file browser and uploader](#!/guide/dev_file_browse_upload) like [CKFinder](http://ckfinder.com/) and use it to upload the image from your local computer to the server inside the CKEditor interface.