# Introduction

**Note:** Disallowed Content feature was introduced in **CKEditor 4.4** as a part of the [Allowed Content Filter](#!/guide/dev_advanced_content_filter) which was introduced in **CKEditor 4.1**.

Disallowed content can be defined in the {@link CKEDITOR.config#disallowedContent} setting or may be dynamically added with the {@link CKEDITOR.filter#disallow} method. It has a higher priority than content allowed automatically or by the {@link CKEDITOR.config#allowedContent} setting, hence it is possible to correct automatic settings or achieve more complex results like "allow all attributes except those starting with on*".

<p class="tip">
	It is not possible to disallow content when the Advanced Content Filter is disabled by setting {@link CKEDITOR.config#allowedContent} to <code>true</code>. Similar solution can be achieved by <a href="TODOTODO">allowing all HTML elements</a>.
</p>

## Disallowed Content Rules

Disallowed content rules are very similar to the [allowed content rules](#!/guide/dev_allowed_content_rules). They also can be specified in two formats ([string](#!/guide/dev_allowed_content_rules-section-string-format) and [object](#!/guide/dev_allowed_content_rules-section-object-format)), however, it is not possible to specify required properties (what simply would not make sense in this case).

When only element names are defined, the rule disallows entire elements (elements will be removed). When rule also contains properties names, only these properties (attributes, styles, classes) will be removed, not elements (unless some required property was removed).

Best to see it in examples.

1. Disallowing entire elements.

		config.allowedContent = 'h1 h2 h3 p';
		config.disallowedContent = 'h2 h3';
		// Input:		<h1>Foo</h1><h2>Bar</h2><h3>Bom</h3>
		// Filtered:	<h1>Foo</h1><p>Bar</p><p>Bom</p>

1. Disallowing attributes, classes and styles.

		config.allowedContent = 'p[*]{*}(foo,bar)';
		config.disallowedContent = 'p[on*](foo)';
		// Input:		<p>Foo</p><p onclick="..." data-foo="1" class="foo bar">Bar</p>
		// Filtered:	<p>Foo</p><p data-foo="1" class="bar">Bar</p>

1. Disallowing required property.

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

    Open image dialog and see that Border, HSpace and VSpace inputs were hidden. Open table dialog and see that Border, Width and Height inputs were hidden.

## How to allow everything except...

A popular requirement is to allow all HTML features except few specific ones. In this case setting {@link CKEDITOR.config#allowedContent} to `true` is not a solution, because this totally disables the [Advanced Content Filter](#!/guide/dev_advanced_content_filter), so {@link CKEDITOR.config#disallowedContent} will not work as well. Therefore the only solution is to write an allowed content rule allowing all elements. Fortunately, this can be done easily by using the [object format of allowed content rules](#!/guide/dev_allowed_content_rules-section-object-format) and the {@link CKEDITOR.dtd} object.

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

The above code sample will allow everything except `<script>` elements and attributes starting from `'on'`.