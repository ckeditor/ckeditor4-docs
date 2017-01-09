<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Reset and External CSS

As we know, CKEditor is used inside webpages. In fact, the CKEditor UI and the skin CSS files are all loaded inside a page that is out of the editor and skin control. This means that the skin can have interference from external CSS present on the page.

Let's suppose a site likes red links. By simply adding `a { color: red; }` in a CSS file would be enough to make the toolbar labels or dialog tabs of the editor red.

To workaround this problem, a skin developer must include "reset styles" that will define defaults for most of the styles that could impact on the editor interface. Check the `reset.css` file in the [Moono skin](#!/guide/skin_sdk_intro-section-2). It is a useful base for it.
