---
category: building-ckeditor
order: 20
url: guide/dev_source
menu-title: Getting Source Code
meta-title-short: Getting Source Code
---
<!--
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Getting the Source Code

Working with the source code of CKEditor 4 may be useful. These are some possible situations that you may face:

 * You are developing plugins or skins, so you want to build your own distributions.
 * You are assembling the editor by yourself, by adding plugins and skins to it manually.
 * You want to understand the CKEditor API better by reading the code.
 * You want to fix an issue. (Yes, do it!)
 * You want to propose some new features or enhancements. (Likewise, we are [looking forward to them](https://github.com/ckeditor/ckeditor4/pulls)!)


## Cloning from GitHub

The CKEditor 4 source code is available in the [ckeditor4](https://github.com/ckeditor/ckeditor4) Git repository hosted at GitHub.

If you have Git installed in your system, use the following command line call to create your local copy:

``` sh
git clone https://github.com/ckeditor/ckeditor4.git
```

This will download the full CKEditor 4 development code into the `ckeditor4` folder.

## Performance

Note that the source code version of CKEditor 4 is not optimized for production websites. It works flawlessly on a local computer or network, but if you include it in your production website, it may need to do more than two hundred HTTP requests to download more than a megabyte of code.

Because of this **do not use the source code version of CKEditor 4 in production websites**!

Once your local development is completed, {@link guide/dev/build/README create a CKEditor build} that will be distribution-ready.
