---
category: accessibility-support
order: 60
url: guide/dev_tabindex
menu-title: Tab Key Navigation
meta-title-short: Tab Key Navigation
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Page Navigation Using the "Tab" Key

To ease page navigation by using keyboard and further boost accessibility, CKEditor can be reached by using the <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> shortcuts that are commonly used for navigating between page elements.

This is a default behavior that works for both classic and inline editors. For {@link guide/dev/framed/README classic}, `iframe`-based editors, you will simply enter the editing area. For {@link guide/dev/inline/README inline} editors, the toolbar will appear for each editable element that you navigate to and editing it will become enabled.

## Influencing Tab Index

You can customize the place that CKEditor will take in the <kbd>Tab</kbd> order of a web page that it is embedded in. Use the {@linkapi CKEDITOR.config.tabIndex CKEDITOR.config.tabIndex} option to assign a custom `tabindex` value to a CKEditor instance. For example:

    config.tabIndex = 3;

This will cause CKEditor to become the third page element that you will enter when using the <kbd>Tab</kbd> key, no matter what its position could be in the page source.

<info-box hint="">
    Please note that this configuration setting is an equivalent of adding the standard <code>tabindex</code> attribute to the element that is being replaced with CKEditor.
</info-box>

## "Tab" Key Based Navigation Demo

See the {@linksdk tabindex working "Page Navigation Using the "Tab" Key" sample} where you can try this page navigation method in practice.

## Related Features

Refer to the following resources for more information about accessibility in CKEditor:

* The {@link guide/dev/a11y/README Accessibility Support in CKEditor} article explains CKEditor compliance with some well-known accessibility standards and gives an overview of available accessibility-related features.
* The {@link guide/dev/features/accessibility_checker/README Managing Content Accessibility with Accessibility Checker} article describes an innovative Accessibility Checker plugin that lets you inspect the accessibility level of content created in CKEditor and immediately solve any accessibility issues that are found.
* The {@link guide/dev/features/shortcuts/README Keyboard Shortcuts} article lists all keyboard shortcuts supported in CKEditor.
* The {@link guide/dev/section508/README CKEditor Section 508 Compliance} article describes CKEditor 4 compatibility with [Section 508 Amendment to the Rehabilitation Act of 1973](http://www.state.gov/m/irm/impact/c32157.htm).
* The {@link guide/dev/wcag/README CKEditor WCAG 2.0 Compliance} article describes CKEditor 4 compatibility with the [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20/) standard.
