# Page Navigation Using the "Tab" Key

To ease page navigation by using keyboard and further boost accessibility, CKEditor can be reached by using the *Tab* and *Shift+Tab* shortcuts that are commonly used for navigating between page elements.

This is a default behavior that works for both classic and inline editors. For [classic](#!/guide/dev_framed), `iframe`-based editors, you will simply enter the editing area. For [inline](#!/guide/dev_inline) editors, the toolbar will appear for each editable element that you navigate to and editing it will become enabled.

## Influencing Tab Index

You can customize the place that CKEditor will take in the *Tab* order of a web page that it is embedded in. Use the CKEDITOR.config.tabIndex option to assign a custom `tabindex` value to a CKEditor instance. For example:

    config.tabIndex = 3;

This will cause CKEditor to become the third page element that you will enter when using the *Tab* key, no matter what its position could be in the page source.

<p class="tip">
    Please note that this configuration setting is an equivalent of adding the standard `tabindex` attribute to the element that is being replaced with CKEditor.
</p>

## "Tab" Key Based Navigation Demo

See the [working "Page Navigation Using the "Tab" Key" sample](http://sdk.ckeditor.com/samples/tabindex.html) where you can try this page navigation method in practice.