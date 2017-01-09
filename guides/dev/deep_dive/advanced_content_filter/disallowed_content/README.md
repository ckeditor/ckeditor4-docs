<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Disallowed Content

<p class="requirements">
	The Disallowed Content feature was introduced in <strong>CKEditor 4.4</strong> as a part of the <a href="#!/guide/dev_advanced_content_filter">Advanced Content Filter</a> system which was introduced in <strong>CKEditor 4.1</strong>.
</p>

The Disallowed Content feature complements the existing Allowed Content feature in that it lets you explicitly blacklist elements that you do not want to have in your CKEditor content. You can use it to limit the features that would otherwise be available in the fully automatic Advanced Content Filter mode.

Disallowed content can be defined in the CKEDITOR.config.disallowedContent setting or may be dynamically added with the CKEDITOR.filter.disallow method. It has a higher priority than content allowed automatically or by the CKEDITOR.config.allowedContent setting, hence it is possible to correct automatic settings or achieve more complex results like "allow all attributes except those starting with `on*`".

<p class="tip">
	It is not possible to disallow content when the Advanced Content Filter is disabled by setting CKEDITOR.config.allowedContent to <code>true</code>. A similar solution can be achieved by allowing all HTML elements.
</p>

## Disallowed Content Rules

Disallowed content rules are very similar to the [allowed content rules](#!/guide/dev_allowed_content_rules). They can be specified in two formats ([string](#!/guide/dev_allowed_content_rules-section-string-format) and [object](#!/guide/dev_allowed_content_rules-section-object-format)), however, it is not possible to specify required properties (which simply would not make any sense in this case).

When only element names are defined, a rule disallows entire elements (and thus these elements will be removed). When a rule also contains property names, only these properties (attributes, styles, classes) will be removed, not elements (unless some required property was removed).

Best to see it in examples.

1. Disallowing entire elements.

		config.allowedContent = 'h1 h2 h3 p';
		config.disallowedContent = 'h2 h3';
		// Input:		<h1>Foo</h1><h2>Bar</h2><h3>Bom</h3>
		// Filtered:	<h1>Foo</h1><p>Bar</p><p>Bom</p>

1. Disallowing attributes, classes, and styles.

		config.allowedContent = 'p[*]{*}(foo,bar)';
		config.disallowedContent = 'p[on*](foo)';
		// Input:		<p>Foo</p><p onclick="..." data-foo="1" class="foo bar">Bar</p>
		// Filtered:	<p>Foo</p><p data-foo="1" class="bar">Bar</p>

1. Disallowing a required property.

		config.allowedContent = 'p; img[!src,alt]';
		config.disallowedContent = 'img[src]';
		// Input:		<p><img src="..." alt="..." /></p>
		// Filtered:	<p></p>

1. Disallowing properties on all elements.

		config.allowedContent = 'p em{*}';
		config.disallowedContent = '*{font*}';
		// Input:		<p style="color: red; font-size: 12px"><em style="font: 'Arial'">Foo</em></p>
		// Filtered:	<p style="color: red"><em>Foo</em></p>

1. Tweaking automatically allowed content.

		// Enabled plugins: image and table.
		config.disallowedContent = 'img{border*,margin*}; table[border]{*}';

    With this code implemented, open the Image Properties dialog window and see that the Border, HSpace, and VSpace fields were hidden. You can also open the Table dialog window and see that the Border, Width, and Height fields were hidden, too.

## How to Allow Everything Except...

A popular requirement is to allow all HTML features except a few specific ones. In this case setting CKEDITOR.config.allowedContent to `true` is not a solution, because this completely disables the [Advanced Content Filter](#!/guide/dev_advanced_content_filter), so CKEDITOR.config.disallowedContent will not work either.

Therefore the only solution is to write an allowed content rule allowing all elements. Fortunately, this can be done easily by using the [object format of allowed content rules](#!/guide/dev_allowed_content_rules-section-object-format) and the CKEDITOR.dtd object.

	config.allowedContent = {
		$1: {
			// Use the ability to specify elements as an object.
			elements: CKEDITOR.dtd,
			attributes: true,
			styles: true,
			classes: true
		}
	};
	config.disallowedContent = 'script; *[on*]';

The above code sample will allow everything except for the `<script>` elements and attributes starting from `'on'`.

## Further Reading

Refer to the following resources for more information about content filtering:

* The [Content Filtering (ACF)](#!/guide/dev_acf) article explains some ACF use cases and the rationale behind this feature.
* The [Advanced Content Filer](#!/guide/dev_advanced_content_filter) article contains more in-depth technical details about ACF.
* The [Allowed Content Rules](#!/guide/dev_allowed_content_rules) article explains the allowed and disallowed content rules format.
* The [Integrating Plugins with Advanced Content Filter](#!/guide/plugin_sdk_integration_with_acf) article explains how to adjust custom plugins to properly implement content filtering.
