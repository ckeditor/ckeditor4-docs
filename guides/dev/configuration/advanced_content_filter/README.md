# Introduction

**Note:** Advanced Content Filter was introduced in **CKEditor 4.1**.


## What is an Advanced Content Filter (ACF)?

ACF is a highly configurable CKEditor core feature **available since CKEditor 4.1**. It limits and adapts input data (HTML set in source mode, by the {@link CKEDITOR.editor#method-setData editor.setData method}, pasted HTML, etc.) so they fit the editor configuration in the best possible way. It may also deactivate features which generates HTML code which is not allowed by the configuration.

Advanced Content Filter works in two modes:

* **automatic** &ndash; filter is configured by editor's features (like plugins, buttons and commands) that are enabled by configuration options such as {@link CKEDITOR.config#plugins}, {@link CKEDITOR.config#extraPlugins} and {@link CKEDITOR.config#toolbar},
* **custom** &ndash; filter is configured by {@link CKEDITOR.config#allowedContent} and only features which match this setting are activated.

In both modes it is possible to extend filter configuration using {@link CKEDITOR.config#extraAllowedContent}.

<p class="tip">
	If you want to disable Advanced Content Filter set {@link CKEDITOR.config#allowedContent} to `true`. All available editor features will be activated and input data will not be filtered.
</p>


## Automatic mode

Advanced Content Filter works in automatic mode when {@link CKEDITOR.config#allowedContent} is not provided. During editor initialization editor features add their rules to the filter. As a result, only content which may be edited using currently loaded features is allowed and all the rest is filtered out.

To better understand automatic mode follow these steps.

1. Open `datafiltering.html` sample from the full or standard package (basic package has too limited set of features).
2. Check the *editor 1* &ndash; it uses default configuration so all buttons, keystrokes, styles, etc. available in your package are activated and editor contents is equal to the originally loaded (except small detail in standard package &ndash; since there is no "justify" plugin, the footer is not aligned to the right).
3. Now check the *editor 4* &ndash; you can see that many plugins and buttons have been removed by {@link CKEDITOR.config#removePlugins} and {@link CKEDITOR.config#removeButtons} settings and {@link CKEDITOR.config#format_tags} list has been trimmed down. Configuration changes are automatically reflected in editor contents &ndash; there is no "image" button, so there is no "image" in the content, there is no "table" plugin, so table which is original content has been removed too. You can check how editor cleans up pasted content or HTML set in source mode.

<p class="tip">
	If you want to configure editor to work in automatic mode, but you need to enable additional HTML tags, attributes, styles or classes, then you can use {@link CKEDITOR.config#extraAllowedContent} option.
</p>


## Custom mode

Advanced Content Filter works in custom mode when {@link CKEDITOR.config#allowedContent} is defined. This configuration option tells the filter which HTML elements, attributes, styles and classes are allowed. Based on defined rules (called allowed content rules) editor filters input data and makes decision which features can be activated.

Allowed Content Rules may be set in two different formats: the compact string format and more powerful object format. Read about Allowed Content Rules in [Allowed Content Rules guide](#!/guide/dev_allowed_content_rules).

To better understand custom mode follow these steps.

1. Open `datafiltering.html` sample from the full or standard package (basic package has too limited set of features).
2. Check the *editor 1* &ndash; it uses default configuration so all buttons, keystrokes, styles, etc. available in your package are activated and editor contents is equal to the originally loaded (except small detail in standard package &ndash; since there is no "justify" plugin, the footer is not aligned to the right).
3. Now check the *editor 2* &ndash; the {@link CKEDITOR.config#allowedContent} defines allowed content rules using the string format.

	Note that rules do not contain `'table'` and therefore "table" button is removed from toolbar and from contents of the editor. The same happened with e.g. "strikethrough" and "horizontal line" features.

	Note also that list items in "styles" and "format" drop-downs are limited to those which are defined in the allowed content rules.

	Dialogs are limited too. For example the "image" dialog contains only the "url", "alt", "width" and "height" values, because only these attributes were defined in {@link CKEDITOR.config#allowedContent}.
4. The *editor 3* is configured by different set of rules, this time defined in object format.


## Content transformations

Advanced Content Filter not only removes disallowed HTML elements, their classes, styles and attributes, but also tries to unify input data by transforming one form of an element to another, preferred form.

Consider a "bold" feature. In HTML it may be represented by `<strong>`, `<b>` or even `<span style="font-weight:700|800|900|bold">` element. Suppose that your {@link CKEDITOR.config#allowedContent} setting contains only rule for a `<b>` element. Does this mean that when pasting `<strong>` or `<span>` element they should be removed?

No. Editor will transform all of them to the `<b>` elements. As a result editor will contain only `<b>` elements and visual form of pasted content will be preserved. Exactly the same will happen if you will leave the default {@link CKEDITOR.config#allowedContent} value (in [automatic mode](#!/guide/dev_advanced_content_filter-section-2)) &ndash; all "bold" feature's forms will be unified to the preferred `<strong>` form.

Now, let's suppose that you allowed `'img[!src,alt,width,height]'` (`<img>` tag with required `src` and three optional attributes). Image size should be set by attributes, so for example a pasted image which size was set by styles will be transformed to image with attributes (note that not always this will be possible &ndash; only pixel based size is transformable).

Content transformations feature is fully automatic and there is no need to configure it. The only thing you have to do is set {@link CKEDITOR.config#allowedContent} or use the default value ([automatic mode](#!/guide/dev_advanced_content_filter-section-2)).

Currently, only few editor features have defined transformations, but their number will be increased in next releases.