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
   * **Firefox** Latest Stable + Windows 7 or 8
 * Hi-Contrast:
   * **Firefox** Latest Stable + Windows 7 or 8
   * **Internet Explorer** 9 + Windows 7 or 8

### Reasoning

Accessibility is just making its first steps into the Web environment. The support for accessibility in browsers and assistive technologies is still very inadequate. In response to this the WAI-ARIA standard was created, aiming to solve this situation. Its adoption is still quite limited, though, and the only browser with good enough support for it at the moment is Firefox.

### Internet Explorer

Internet Explorer 9+ offers reasonable support for WAI-ARIA. It is still not complete, but the current status looks promising. Even if we do not officially support this browser with regard to screen reading accessibility, we are still taking it into consideration during our development, testing it and eventually working around its limitations. Currently CKEditor should provide a good experience for Internet Explorer 9+ users that need accessibility support. In any case, we still strongly recommend to use Firefox for an optimum accessibility experience.

## A Word About Mobile Environments

CKEditor is generally compatible with iOS 6 (iPhone and iPad), though we still think that the usability aspect needs further development. Research and development in this area is ongoing and, as a result, we may in due course enlarge our graded support to also include iOS.

