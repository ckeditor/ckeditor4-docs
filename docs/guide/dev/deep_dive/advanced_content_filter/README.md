---
category: advanced-content-filter
order: 20
url: guide/dev_advanced_content_filter
menu-title: Introduction
meta-title-short: Introduction
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Advanced Content Filter

<info-box info=""> Advanced Content Filter was introduced in <strong>CKEditor 4.1</strong>.
</info-box>

## What is Advanced Content Filter (ACF)?

ACF is a highly configurable CKEditor core feature **available since CKEditor 4.1**. It limits and adapts input data (HTML code added in source mode or by the {@linkapi CKEDITOR.editor#method-setData editor.setData method}, pasted HTML code, etc.) so it matches the editor configuration in the best possible way. It may also deactivate features which generate HTML code that is not allowed by the configuration.

Advanced Content Filter works in two modes:

* **automatic** &ndash; the filter is configured by editor features (like plugins, buttons, and commands) that are enabled with configuration options such as {@linkapi CKEDITOR.config#plugins }, {@linkapi CKEDITOR.config#extraPlugins }, and {@linkapi CKEDITOR.config#toolbar },
* **custom** &ndash; the filter is configured by the {@linkapi CKEDITOR.config#allowedContent } option and only features that match this setting are activated.

In both modes it is possible to extend the filter configuration by using the {@linkapi CKEDITOR.config#extraAllowedContent } setting or to trim it down by using the {@linkapi CKEDITOR.config#disallowedContent } setting.

<info-box hint="">
    <p>
        <strong>ACF does not replace a security filter for your website content.</strong> If the content that is to be loaded into CKEditor comes from untrusted sources (e.g. the users of your website), you should always filter it on the server side to avoid potential XSS issues &mdash; just like you would do it for any other content intended to be published on your website.
    </p>
    <p>
        Configuring ACF to accept additional tags and attributes that are unsupported by CKEditor features may result in XSS vulnerabilities. For example, if you decide to allow all attributes in HTML elements, you will allow users to enter <code>onclick</code>, <code>onload</code>, <code>onerror</code> handlers. Although ACF is not a security filter, leaving it in default, automatic mode should minimise the risk of XSS issues.
    </p>
    <p>
   		If you want to disable Advanced Content Filter, set {@linkapi CKEDITOR.config#allowedContent } to <code>true</code>. All available editor features will be activated and input data will not be filtered. Note that you cannot use {@linkapi CKEDITOR.config#disallowedContent } when ACF is disabled.
    </p>
</info-box>

## Automatic Mode

Advanced Content Filter works in automatic mode when the {@linkapi CKEDITOR.config#allowedContent } setting is not provided. During editor initialization, editor features add their rules to the filter. As a result, only the content that may be edited using currently loaded features is allowed, and all the rest is filtered out.

Please note that this means that **ACF is tightly connected with editor configuration**. Take the official CKEditor presets (Basic, Standard and Full). Each one of them includes a different set of features (toolbar buttons, keyboard shortcuts, content styles) and as a result, the same content pasted into editor instances with these configurations [will look completely different](https://sdk.ckeditor.com/samples/acf.html), as CKEditor will adjust it to what is available in a particular setup.

Whenever you adjust your editor configuration, for example by using the {@linkapi CKEDITOR.config.removePlugins CKEDITOR.config.removePlugins} and {@linkapi CKEDITOR.config.removeButtons CKEDITOR.config.removeButtons} methods or customizing the **Format** and **Styles** drop-down lists, these changes will affect the filter and the automatic ACF mode will make the editor remove content corresponding to disabled features.

### Automatic Mode Example

Consider the following configuration for an editor with ACF working in default, automatic mode:

	config.removePlugins = 'image,table,tabletools,horizontalrule';
	config.removeButtons = 'Anchor,Underline,Strike,Subscript,Superscript';
	config.format_tags = 'p;h1;h2;pre';

In this setup several tags will not be allowed in the editor because there is no plugin or button that is responsible for creating and editing this kind of content. This pertains to elements such as `<img>` (Image feature), `<table>` and its descendants (Table and Table Tools plugins) and `<hr>` (Horizontal Rule feature) as well as `<u>`, `<s>`, `<sub>` and `<sup>` that are normally provided by the Basic Styles plugin, but whose buttons were removed in the configuration. The **Format** drop-down list was trimmed down, too, so unsupported formats will also be removed.

See the [Advanced Content Filter &ndash; Automatic Mode](https://sdk.ckeditor.com/samples/acf.html) sample for a live demonstration.

<info-box hint=""> If you want to configure the editor to work in automatic mode, but need to enable additional HTML tags, attributes, styles, or classes, use the {@linkapi CKEDITOR.config#extraAllowedContent } configuration option. <strong>Since CKEditor 4.4</strong> you can also disallow some of the automatically allowed content by using the {@linkapi CKEDITOR.config#disallowedContent }.
</info-box>


## Custom Mode

Advanced Content Filter works in custom mode when the {@linkapi CKEDITOR.config.allowedContent CKEDITOR.config.allowedContent} setting is defined. This configuration option tells the filter which HTML elements, attributes, styles, and classes are allowed. Based on defined rules (called *Allowed Content Rules*) the editor filters input data and decides which features can be activated.

Allowed Content Rules may be set in two different formats: the compact **string format** and the more powerful **object format**. Read about Allowed Content Rules in the {@link guide/dev/deep_dive/advanced_content_filter/allowed_content_rules/README Allowed Content Rules article}.

In custom mode the content filter configuration affects the availability of editor features (toolbar buttons, dialog window tabs and fields, keyboard shortcuts, content styles). If a feature is not explicitely defined as allowed, it will be disabled in editor UI and corresponding content will be removed.

### Custom Mode Example

Suppose that {@linkapi CKEDITOR.config.allowedContent CKEDITOR.config.allowedContent} is configured as follows:

	config.allowedContent =
		'h1 h2 h3 p blockquote strong em;' +
		'a[!href];' +
		'img(left,right)[!src,alt,width,height];';

This will have the following effect:

* `h1 h2 h3 p blockquote strong em` &ndash; Only these tags are accepted by the editor. Any tag attributes will be discarded.
* `a[!href]` &ndash; The `href` attribute is obligatory for the `<a>` tag. Tags without this attribute are discarded. No other attribute will be accepted for the `<a>` tag.
* `img(left,right)[!src,alt,width,height]` &ndash; The `src` attribute is obligatory for the `<img>` tag. The `alt`, `width`, `height` and `class` attributes are accepted, but `class` must be either `class="left"` or `class="right"`.
* Several toolbar buttons and dialog window fields that are responsible for the features which were not explicitely listed as allowed will be removed. In the Standard editor preset this will mean that, for example, the Strike-through, Numbered List, Bulleted List, Anchor, Table and Horizontal Line toolbar buttons will be gone, just like most of the fields of the Image Properties dialog window and formats from the Format drop-down list.

See the [Advanced Content Filter &ndash; Custom Mode](https://sdk.ckeditor.com/samples/acf_custom.html) sample for a live demonstration.

## Content Transformations

Advanced Content Filter not only removes disallowed HTML elements, their classes, styles, and attributes, but it also tries to unify input data by transforming one form of an element to another, preferred form.

Consider the Bold feature. In HTML code it may be represented by `<strong>`, `<b>`, or even a `<span style="font-weight:700|800|900|bold">` element. Suppose that the {@linkapi CKEDITOR.config#allowedContent } setting contains only a rule for the `<b>` element. Does this mean that when pasting the `<strong>` or `<span>` element they will be removed?

No. The editor will transform all of them to `<b>` elements. As a result the editor will contain only `<b>` elements and the visual form of pasted content will be preserved. Exactly the same will happen if you leave the default {@linkapi CKEDITOR.config#allowedContent } value (in {@link guide/dev/deep_dive/advanced_content_filter/README#automatic-mode automatic mode}) &mdash; all Bold feature forms will be unified to the preferred `<strong>` form.

Suppose that the `'img[!src,alt,width,height]'` setting (`<img>` tag with required `src` and three optional attributes) was added to Allowed Content Rules. Image size should be set with attributes, so for example a pasted image whose size was set with styles will be transformed to an image with attributes (note that it will not be possible in all scenarios &mdash; only pixel-based size can be transformed).

The content transformation feature is fully automatic and there is no need to configure it. The only thing you have to do is set the {@linkapi CKEDITOR.config#allowedContent } option or use the default value ({@link guide/dev/deep_dive/advanced_content_filter/README#automatic-mode automatic mode}).

Currently, we have defined content transformations for only a handful of editor features, but their number will increase in future releases.

## Filtering Pasted and Dropped Content

An {@linkapi CKEDITOR.config#pasteFilter additional filter} (called *paste filter*) can be configured to handle pasted and dropped content. It will be applied independently from ACF, so it can be used as the only filter (with disabled ACF), or as a complementary filter (for example to filter pasted content with more strict rules than all other content).

In browsers where it is possible to recognize whether the content comes (was copied or dragged) from an editor the paste filter will be applied only to content that does not come from any editor. At the time of writing (June 2015) content source can be recognized only in Blink and Webkit based browsers. In other browsers, if the paste filter is enabled, it is applied to all pasted and dropped content.

**Note:** By default this filter is enabled in Chrome, Opera and Safari, because they keep messy HTML content in the clipboard. In these browsers the paste filter is configured to `'semantic-content'` which means that it will strip all inline styles and classes (because these are classes used on the source page, not inside the editor).

Read more about the paste filter in the {@linkapi CKEDITOR.config#pasteFilter } documentation.

## Advanced Content Filter Demos

The following samples are available for two ACF modes:

* The [Advanced Content Filter &ndash; Automatic Mode](https://sdk.ckeditor.com/samples/acf.html) sample shows the default implementation of ACF and its customization.
* The [Advanced Content Filter &ndash; Custom Mode](https://sdk.ckeditor.com/samples/acfcustom.html) sample shows how the custom ACF mode works.

## Further Reading

Refer to the following resources for more information about content filtering:

* The {@link guide/dev/acf/README Content Filtering (ACF)} article explains some ACF use cases and the rationale behind this feature.
* The {@link guide/dev/deep_dive/advanced_content_filter/allowed_content_rules/README Allowed Content Rules} article explains the allowed and disallowed content rules format.
* The {@link guide/dev/deep_dive/advanced_content_filter/disallowed_content/README Disallowed Content} article explains how blacklisting works in ACF.
* The {@link guide/plugin_sdk/integration_with_acf/README Integrating Plugins with Advanced Content Filter} article explains how to adjust custom plugins to properly implement content filtering.
