<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Building and Releasing Your Skin

So far, you've worked on the "source version" of your skin. Now that your skin
is perfect as you wanted, it is time to prepare it to be used in production
websites.

To do so you'll need CKBuilder a Java application that makes this magic happen. It can be downloaded here: [http://download.cksource.com/CKBuilder/](http://download.cksource.com/CKBuilder/).

[Java](http://java.com/en/download/) must be available on your command line. To run the builder, simply copy `ckbuilder.jar` into the `skins` folder of CKEditor (where your skin custom folder is available) and execute this command:

	 > java -jar ckbuilder.jar --build-skin myskin myskin-release

The `myskin` and `myskin-release` parts are your skin folder name and the destination folder name. Just use the names you prefer.

This is the job done by CKBuilder on your skin:

* Merges all CSS files parts. This means that all CSS files having `@import` entries will have their imported files in-lined, having just one file available.
* Minifies CSS and JavaScript files, reducing their size to optimize the download speed.
* Generates a single "strip image" containing all icons provided by the skin.
* Removes all unnecessary files.

You skin is ready. The release version is the one to use on your websites or to distribute to others, while the source version can be shared to the world through services like [GitHub](http://github.com/).

<p class="tip">
	To avoid the manual installation process <a href="https://ckeditor.com/cke4/add/skin">submit your skins to the Add-ons Repository</a> and encourage third-party developers to do so. In this way you will be able to both give something to the community and get valuable feedback on your work.
</p>
