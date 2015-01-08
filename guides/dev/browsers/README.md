<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Browser Compatibility

## CKEditor Graded Browser Support

The CKEditor core team uses [YUI Graded Browser Support](http://yuilibrary.com/yui/docs/tutorials/gbs/) (also known as "GBS") as the basis for CKEditor compatibility requirements. Our support matrix is amended with a few additions to the [YUI GBS model](http://yuilibrary.com/yui/environments/) that the team feels are important for its user base.

YUI Graded Browser Support is an approach to [progressive enhancement](http://en.wikipedia.org/wiki/Progressive_enhancement) proposed by Yahoo!. Detailed information about this initiative can be found on its [dedicated page](http://yuilibrary.com/yui/docs/tutorials/gbs/), including the reasoning behind the YUI team choices.

CKEditor not only provides similar browser support that YUI GBS proposes, but it also incorporates its culture and behavior regarding the grades of support and the QA approach to them.

## A-Graded Browser Support

The following is the list of browser versions that will receive **A-grade** support as defined by the CKEditor Graded Browser Support. CKEditor aims to provide at least full A-grade support for the following products:

 * **Internet Explorer**: 8.0, 9.0, *9.0 Quirks*, 10,  and 11
 * **Firefox**: latest stable release
 * **Chrome**: latest stable release
 * **Safari**: latest stable release
 * ***Opera**: latest stable release*

*Cursive terms indicate our additions to the YUI GBS.*

Please note that Internet Explorer 6 is not supported for CKEditor 4. CKEditor 4.1.3 is the last release to support Internet Explorer 7 and Firefox 3.6.

All browsers are to be supported for web pages with the Document Type Declaration (`DOCTYPE`) of HTML5 (`<!DOCTYPE html>`) except for IE 9 Quirks that will support unknown doctypes.

## Accessibility Support

Besides the browser support described above we are also introducing the following table to define the list of browsers and assistive technologies supported with A-grade by CKEditor:

 * [JAWS](http://www.freedomscientific.com/products/fs/JAWS-product-page.asp) Latest Stable:
   * **Firefox** Latest Stable on Windows 7 or 8
 * High Contrast:
   * **Firefox** Latest Stable on Windows 7 or 8
   * **Internet Explorer** 9+ on Windows 7 or 8

Refer to the [Accessibility Support in CKEditor](#!/guide/dev_a11y) article to learn about CKEditor compliance with some well-known accessibility standards and why we treat Firefox + JAWS as our reference environment for testing. You will also get an overview of available accessibility-related features there.

## A Word About Mobile Environments

CKEditor is generally compatible with **iOS 6+** (iPhone and iPad), though we still think that the usability aspect needs further development. Research and development in this area is ongoing and, as a result, we may in due course enlarge our graded support to also include iOS.

CKEditor is also compatible with **Chrome for Android** (which is preinstalled on a growing number of Android devices), though in this case usability also needs to be improved.

You can find more information in our [research on CKEditor support for mobile environments](http://dev.ckeditor.com/ticket/11712#comment:5).

Finally, CKEditor is disabled in other browsers for Android and on Windows Phone 8. You can change CKEditor settings to accept any mobile environment (at your own risk) by modifying the [env.js](https://github.com/ckeditor/ckeditor-dev/blob/master/core/env.js) file, but you will not have the same experience as on desktop environments.

Full mobile support will be introduced in **CKEditor 5**. We aim to have perfect CKEditor support for most popular mobile platforms, so if you encountered an issue with an environment that is unsupported as of now, please report it on our [CKEditor Development site](https://dev.ckeditor.com/).

## Unsupported Environments

When CKEditor detects an unsupported environment, it will simply not load and the user will be presented with a standard editable element (for example a `<textarea>` or `<div>`) that the editor was supposed to replace.

It is possible to skip the compatibility check and [enable CKEditor in all environments](#!/guide/dev_unsupported_environments), including the unsupported ones, but this is an experimental feature aimed at more advanced developers and is highly unrecommended on production environments.

## Further Reading

Refer to the following resources for more information about related features:

* The [Accessibility Support in CKEditor](#!/guide/dev_a11y) article explains CKEditor compliance with some well-known accessibility standards and gives an overview of available accessibility-related features.
* The [Enabling CKEditor in Unsupported Environments](#!/guide/dev_unsupported_environments) article shows how to make CKEditor work in any environment that is not listed as officially supported (warning: experimental feature!).