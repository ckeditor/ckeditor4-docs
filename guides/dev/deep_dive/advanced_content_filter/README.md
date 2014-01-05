# Introduction

**Note:** Advanced Content Filter was introduced in **CKEditor 4.1**.


## What is Advanced Content Filter (ACF)?

ACF is a highly configurable CKEditor core feature **available since CKEditor 4.1**. It limits and adapts input data (HTML code added in source mode or by the {@link CKEDITOR.editor#method-setData editor.setData method}, pasted HTML code, etc.) so it matches the editor configuration in the best possible way. It may also deactivate features which generate HTML code that is not allowed by the configuration.

Advanced Content Filter works in two modes:

* **automatic** &ndash; the filter is configured by editor features (like plugins, buttons, and commands) that are enabled with configuration options such as {@link CKEDITOR.config#plugins}, {@link CKEDITOR.config#extraPlugins}, and {@link CKEDITOR.config#toolbar},
* **custom** &ndash; the filter is configured by the {@link CKEDITOR.config#allowedContent} option and only features that match this setting are activated.

In both modes it is possible to extend the filter configuration by using the {@link CKEDITOR.config#extraAllowedContent} setting.

<p class="tip">
	If you want to disable Advanced Content Filter, set {@link CKEDITOR.config#allowedContent} to <code>true</code>. All available editor features will be activated and input data will not be filtered.
</p>


## Automatic Mode

Advanced Content Filter works in automatic mode when the {@link CKEDITOR.config#allowedContent} setting is not provided. During editor initialization, editor features add their rules to the filter. As a result, only the content that may be edited using currently loaded features is allowed, and all the rest is filtered out.

The following example might make it easier to understand the automatic ACF mode.

1. Open the `datafiltering.html` sample from the Full or Standard CKEditor package (the set of features offered by the Basic package is too limited ).
2. Check *editor 1*. It uses the default configuration, so all buttons, keystrokes, or styles available in your package are activated and editor contents are identical to what was originally loaded (except a small detail in the Standard package &mdash; since it does not contain the Justify plugin, the footer is not aligned to the right).
3. Now check *editor 4*. You can see that many plugins and buttons were removed by the {@link CKEDITOR.config#removePlugins} and {@link CKEDITOR.config#removeButtons} settings; the {@link CKEDITOR.config#format_tags} list was trimmed down, too. Configuration changes are automatically reflected in editor contents &mdash; there is no Image toolbar button, so there is no image in the contents; there is no Table plugin, so the table added in the original contents was removed, too. You can see how the editor cleans up pasted content or HTML code set in the source mode.

<p class="tip">
	If you want to configure the editor to work in automatic mode, but need to enable additional HTML tags, attributes, styles, or classes, use the {@link CKEDITOR.config#extraAllowedContent} configuration option.
</p>


## Custom Mode

Advanced Content Filter works in custom mode when the {@link CKEDITOR.config#allowedContent} setting is defined. This configuration option tells the filter which HTML elements, attributes, styles, and classes are allowed. Based on defined rules (called *Allowed Content Rules*) the editor filters input data and decides which features can be activated.

Allowed Content Rules may be set in two different formats: the compact **string format** and the more powerful **object format**. Read about Allowed Content Rules in the [Allowed Content Rules article](#!/guide/dev_allowed_content_rules).

The following example might make it easier to understand the custom ACF mode.

1. Open the `datafiltering.html` sample from the Full or Standard CKEditor package (the set of features offered by the Basic package is too limited ).
2. Check *editor 1*. It uses the default configuration, so all buttons, keystrokes, or styles available in your package are activated and editor contents are identical to what was originally loaded (except a small detail in the Standard package &mdash; since it does not contain the Justify plugin, the footer is not aligned to the right).
3. Now check *editor 2*. The {@link CKEDITOR.config#allowedContent} option defines Allowed Content Rules using the string format.

	Note that since the rules do not allow the `'s'` element, the Strike Through button was removed from the toolbar and the strike-through formatting was removed from the text. The same happened for example with the Horizontal Line, Subscript, or Superscript features.

	See also that the Styles and Format drop-down lists only contain the items which are defined in the Allowed Content Rules.

	What is more, options available in some dialog windows are limited, too. For example the Image dialog window contains only the URL, Alternative Text, Width, and Height values, because only these attributes were defined in {@link CKEDITOR.config#allowedContent}.
4. Additionally, *editor 3* is configured by using a different set of rules defined in the object format.


## Content Transformations

Advanced Content Filter not only removes disallowed HTML elements, their classes, styles, and attributes, but it also tries to unify input data by transforming one form of an element to another, preferred form.

Consider the Bold feature. In HTML code it may be represented by `<strong>`, `<b>`, or even a `<span style="font-weight:700|800|900|bold">` element. Suppose that the {@link CKEDITOR.config#allowedContent} setting contains only a rule for the `<b>` element. Does this mean that when pasting the `<strong>` or `<span>` element they will be removed?

No. The editor will transform all of them to `<b>` elements. As a result the editor will contain only `<b>` elements and the visual form of pasted content will be preserved. Exactly the same will happen if you leave the default {@link CKEDITOR.config#allowedContent} value (in [automatic mode](#!/guide/dev_advanced_content_filter-section-2)) &mdash; all Bold feature forms will be unified to the preferred `<strong>` form.

Suppose that the `'img[!src,alt,width,height]'` setting (`<img>` tag with required `src` and three optional attributes) was added to Allowed Content Rules. Image size should be set with attributes, so for example a pasted image whose size was set with styles will be transformed to an image with attributes (note that it will not be possible in all scenarios &mdash; only pixel-based size can be transformed).

The content transformation feature is fully automatic and there is no need to configure it. The only thing you have to do is set the {@link CKEDITOR.config#allowedContent} option or use the default value ([automatic mode](#!/guide/dev_advanced_content_filter-section-2)).

Currently, we have defined content transformations for only a handful of editor features, but their number will increase in future releases.