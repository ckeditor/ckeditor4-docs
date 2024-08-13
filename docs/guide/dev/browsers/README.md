---
category: support
order: 20
url: guide/dev_browsers
menu-title: Browser Compatibility
meta-title-short: Browser Compatibility
---
<!--
Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Browser Compatibility

The CKEditor 4 core team uses an approach of [progressive enhancement](http://en.wikipedia.org/wiki/Progressive_enhancement) to provide the best possible experience in modern, fully capable browsers as well as in older browsers or browsers which do not support all required features. Therefore, the general level of support differs depending on an environment used and some features may not be available in certain cases.

## Officially Supported Browsers

The list of officially supported browsers contains those which the CKEditor 4 core team actively uses during the development and testing. CKEditor 4 may also work in browsers which are not included in the following list, because due to the huge number of various environments available the team is not able to check all of them.

* **Desktop environments**:
  * **Internet Explorer**:
    * 8.0, 9.0, 10.0 &ndash; close to full support guaranteed up to CKEditor 4.20,
    * 9.0 Quirks Mode and 9.0 Compatibility Mode &ndash; limited support guaranteed up to CKEditor 4.20.
    * 11 &ndash; full support,
    * IE11 mode in Microsoft Edge &ndash; full support,
  * **Firefox, Chrome, Safari, Microsoft Edge, Opera**:
    * Latest stable release &ndash; full support.
* **Mobile environments**:
  * **Safari** (all vendor-supported versions) &ndash; close to full support,
  * **Chrome** (all vendor-supported versions) &ndash; close to full support.

**Note:** All browsers are to be supported for web pages that work in Standards Mode (i.e. with a valid Document Type Declaration, for example of HTML5 (`<!DOCTYPE html>`)) except for IE 9 Quirks that will support unknown doctypes.

### Internet Explorer Support

Internet Explorer browsers in versions 8.0, 9.0 (including Quirks Mode and Compatibility Mode) and 10.0 are supported up to CKEditor 4.20. As the official Microsoft technical support for these browsers is discontinued, they are backed by the editor up to version 4.20. It is highly recommended to use the more secure Microsoft Edge (or other modern browsers) these days, but if you need to use IE 8-10, make sure to use the editor in version 4.20. Otherwise, some features may not work properly.

#### Internet Explorer 8.0 and 9.0

These browsers are generally fully compatible with CKEditor 4.20 with just a few exceptions. Namely:

* There is no support for uploading pasted and dropped files (required APIs are not available).
* In Internet Explorer 8.0 the [Mathematical Formulas](https://ckeditor.com/cke4/addon/mathjax), [Code Snippet](https://ckeditor.com/cke4/addon/codesnippet), [Embed](https://ckeditor.com/cke4/addon/embed) and [Semantic Embed](https://ckeditor.com/cke4/addon/embedsemantic) widgets are not supported.
* In Internet Explorer 8.0 there is no support for nested {@link guide/dev/deep_dive/widgets/README widgets}.
* In Internet Explorer 8.0 there is no support for {@link features/accessibility_checker/README Accessibility Checker}.

#### Internet Explorer 9.0 Quirks and Compatibility Modes

Using both modes is highly unrecommended, because they put the browser in legacy modes which are very limited. Hence, the level of support is limited, too:

* In Quirks Mode most of the new features are not going to work including {@link guide/dev/inline/README inline editing}, {@link guide/dev/deep_dive/widgets/README widgets} and {@link features/accessibility_checker/README Accessibility Checker}. We recommend checking whether particular features work acceptably prior to incorporating them.
* In Compatibility Mode most features work similarly to Internet Explorer 8.0, but the user interface looks worse.

### A Word About Mobile Environments

CKEditor 4 is generally compatible with **iOS 6+** (iPhone and iPad), though we still think that the usability aspect needs further development.

CKEditor 4 is also compatible with **Chrome for Android** (which is preinstalled on a growing number of Android devices), though in this case usability also needs to be improved.

<info-box hint="">
  Prior to version 4.5 CKEditor was disabled in some versions of Chrome for Android and may be disabled in Internet Explorer Mobile for Windows Phone. You can, however, {@link guide/dev/deep_dive/unsupported_environments/README change CKEditor settings to accept any mobile environment} (at your own risk).
</info-box>

Full mobile support will be introduced in **CKEditor 5**. We aim to have perfect CKEditor support for most popular mobile platforms, so if you encountered an issue with an environment that is unsupported as of now, please report it on our [GitHub issues page](https://github.com/ckeditor/ckeditor4/issues).

## Unsupported Environments

Please note that Internet Explorer 6 is not supported for CKEditor 4. CKEditor 4.1.3 is the last release to support Internet Explorer 7 and Firefox 3.6.

When CKEditor 4 detects an unsupported environment, it will simply not load and the user will be presented with a standard editable element (for example a `<textarea>` or `<div>`) that the editor was supposed to replace.

It is possible to skip the compatibility check and {@link guide/dev/deep_dive/unsupported_environments/README enable CKEditor in all environments}, including the unsupported ones, but this is an experimental feature aimed at more advanced developers and is highly unrecommended in production environments.

**Note:** Prior to version 4.5 CKEditor was disabled in all environments which were not recognized as compatible. Since CKEditor 4.5 the whitelist was changed to a blacklist, so currently CKEditor 4 is only disabled in environments which it is known to be incompatible with (for example Internet Explorer 7 and below and Firefox 3.6 and below). Read more in {@linkapi CKEDITOR.env.isCompatible CKEDITOR.env.isCompatible}.

## Accessibility Support

Besides the browser support described above we are also introducing the following table to define the list of browsers and assistive technologies supported by CKEditor 4:

 * [JAWS](http://www.freedomscientific.com/products/fs/JAWS-product-page.asp) Latest Stable:
   * **Firefox** Latest Stable on Windows 7, 8 or 10
 * High Contrast:
   * **Firefox** Latest Stable on Windows 7, 8 or 10
   * **Microsoft Edge** Latest Stable on Windows 10
   * **Internet Explorer** 9+ on Windows 7, 8 or 10

Refer to the {@link guide/dev/a11y/README Accessibility Support in CKEditor} article to learn about CKEditor 4 compliance with some well-known accessibility standards and why we treat Firefox + JAWS as our reference environment for testing. You will also get an overview of available accessibility-related features there.

## Further Reading

Refer to the following resources for more information about related features:

* The {@link guide/dev/a11y/README Accessibility Support in CKEditor} article explains CKEditor 4 compliance with some well-known accessibility standards and gives an overview of available accessibility-related features.
* The {@link guide/dev/deep_dive/unsupported_environments/README Enabling CKEditor 4 in Unsupported Environments (CKEditor &lt;4.4.8)} article shows how to make CKEditor &lt;4.4.8 work in any environment that was not listed as officially supported (warning: experimental feature!).
