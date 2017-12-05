<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# File Upload

The following article contains tips about uploading and managing files in CKEditor. Refer to the [File Manager](#!/guide/dev_file_browse_upload) section of the documentation for more information about this topic.


## How Do I Upload Files or Images Using CKEditor?

By default CKEditor does not include a file browser or uploader. You can, however, create a [custom file browser](#!/guide/dev_file_browser_api) or [use an existing one](#!/guide/dev_file_browse_upload), like [CKFinder](https://cksource.com/ckfinder).


## How Do I Paste a Local Image from my Clipboard to CKEditor?

Since CKEditor 4.5 it is possible to enable uploading images pasted from clipboard or dragged and dropped into the editor. Please refer to the [Uploading Dropped or Pasted Files](#!/guide/dev_file_upload) article for more information.

Do note that this still requires [integrating a file manager](#!/guide/dev_file_browse_upload) to handle the server-side part of the upload.
