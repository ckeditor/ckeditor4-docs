---
category: howtos
order: 100
url: guide/dev_howtos_file_upload
menu-title: File Upload
meta-title-short: File Upload
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# File Upload

The following article contains tips about uploading and managing files in CKEditor 4. Refer to the {@link guide/dev/integration/file_browse_upload/README File Manager} section of the documentation for more information about this topic.


## How Do I Upload Files or Images Using CKEditor 4?

By default CKEditor 4 does not include a file browser or uploader. You can, however, create a {@link guide/dev/integration/file_browse_upload/file_browser_api/README custom file browser} or {@link guide/dev/integration/file_browse_upload/README use an existing one}, like [CKFinder](https://cksource.com/ckfinder).


## How Do I Paste a Local Image from my Clipboard to CKEditor 4?

Since CKEditor 4.5 it is possible to enable uploading images pasted from clipboard or dragged and dropped into the editor. Please refer to the {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Dropped or Pasted Files} article for more information.

Do note that this still requires {@link guide/dev/integration/file_browse_upload/README integrating a file manager} to handle the server-side part of the upload.
