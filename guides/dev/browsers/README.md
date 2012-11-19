# Browsers Compatibility

## CKEditor Graded Browser Support

The CKEditor core team uses the [YUI Graded Browser Support](http://yuilibrary.com/yui/docs/tutorials/gbs/) (also known as “GBS”) as the basis for the CKEditor compatibility requirements. It is amended by a few exceptions to the YUI GBS model that the team feels as important for its user base.

YUI Graded Browser Support is an approach to [progressive enhancement](http://en.wikipedia.org/wiki/Progressive_enhancement) proposed by Yahoo!. Detailed information about this initiative can be found on its [dedicated page](http://yuilibrary.com/yui/docs/tutorials/gbs/), including the reasoning behind their choices.

CKEditor not only provides a similar browser support that YUI GBS proposes, but it also incorporate their culture and behavior regarding the grades of support and the project QA approach to them.

## A-Graded Browser Support

The following is the list of browser versions that will receive **A-grade** support as defined by the CKEditor GBS. CKEditor, aim to provide at least full A-grade support for the following products:

 * **Internet Explorer**: 7.0, 8.0, *8.0 Quirks* (planned: CKEditor 4.0.1), 9.0 and 10
 * **Firefox**: *all major stable releases* starting from 3.† (e.g. 4.†, 5.†, etc.)
 * **Chrome**: latest stable
 * **Safari**: latest stable
 * ***Opera**: latest stable*
 
*Cursive terms indicate our additions to the YUI GBS. The dagger symbol (†) indicates that the most current non-beta version at that branch level receives support.*

All browsers are to be supported for web pages with the Document Type Declaration (doctype) of XHTML 1.0 Transitional except for IE 8 Quirks, which will support unknown doctypes.

## Accessibility Support

Besides the browser support described above we are also introducing the following table to define the list of browsers and assistive technologies supported with A-grade by CKEditor:

 * [JAWS](http://www.freedomscientific.com/products/fs/JAWS-product-page.asp) Latest Stable:
   * **Firefox** Latest Stable + Windows 7
 * Hi-Contrast:
   * **Firefox** Latest Stable + Windows 7
   * **Internet Explorer** 9 + Windows 7

### Reasoning

Accessibility is just making its first steps into the Web environment. The support for accessibility in browsers and assistive technologies is still very inadequate. In response to this the WAI-ARIA standard was created, aiming to solve this situation. Its adoption is still quite limited, though, and the only browser with good enough support for it at the moment is Firefox.

### Internet Explorer

Internet Explorer 9 offers reasonable support for WAI-ARIA. It is still not complete, but the current status looks promising. Even if we do not officially support this browser with regard to screen reading accessibility, we are still taking it in consideration during our development, testing it, and eventually working around its limitations. Currently CKEditor should provide a good experience for Internet Explorer 9 users that need accessibility support. In any case, we still strongly recommend to use Firefox for an optimum accessibility experience.

## A Word About Mobile Environments

CKEditor is generally compatible with iOS 6 (iPhone and iPad). Still we think that the usability aspect needs further development. We'll be working soon on research and development on it and, as a result, we may in due course enlarge our graded support to also include iOS.

