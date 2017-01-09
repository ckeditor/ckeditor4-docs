<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Allowed Content Rules

<p class="requirements">
	<a href="#!/guide/dev_advanced_content_filter">Advanced Content Filter</a> was introduced in <strong>CKEditor 4.1</strong>. Since <strong>CKEditor 4.4</strong> Allowed Content Rules are complemented by <a href="#!/guide/dev_disallowed_content">Disallowed Content Rules</a> that let you blacklist specific elements.
</p>

## Introduction

Allowed Content Rules define which HTML elements, attributes, styles, and classes are allowed. When configuring CKEditor you will be mostly interested in setting the {@link CKEDITOR.config#allowedContent} and {@link CKEDITOR.config#disallowedContent} options. Plugin developers will also need to set {@link CKEDITOR.feature#allowedContent} properties which tell the editor what kind of content a feature allows in [automatic mode](#!/guide/dev_advanced_content_filter-section-2).

Allowed Content Rule usually consists of four main parts:

* the **elements** that it allows,
* the **attributes** that these elements may have,
* the **styles** that these elements may have,
* the **classes** that these elements may have.

**Note:** Instead of writing "attributes, styles, and classes", "**properties**" will be used as a shorthand.

Multiple rules may exist for one element and one element may be included in numerous element lists. For example each of the rules may allow another set of element properties.

### Rules Application

First [disallowed content rules](#!/guide/dev_disallowed_content) are applied to the element. An element may be rejected as a whole (if the rule specifies only the element name) or its properties may be removed. Once an element or its property is rejected they cannot be brought back by allowed content rules.

Then allowed content rules are applied one by one to the element. Initially the element being filtered is invalid and all its properties are rejected. The first rule applied to the element validates it (it will not be removed) and that rule may accept some element properties. Another rule may cause the editor to accept further element properties.

Therefore:

* If there are no allowed content rules for an element, it is removed.
* It is possible to accept an element, but reject all its properties which will then be removed.
* Once validated, an element or its property cannot be invalidated by another allowed content rule.
* Once rejected by a disallowed content rule, an element or its properties cannot be accepted by an allowed content rule.
* If a disallowed content rule removed a property which is required by any allowed content rule, that rule will not validate the element.

## String Format

The string format is a compact notation for Allowed Content Rules, but it does not offer all features available in the object format. However, in most cases it should be sufficient.

Rule format:

	elements [attributes]{styles}(classes)

	Regexp pattern:
	  <   elements   ><                       styles, attributes and classes                        >< separator >
	/^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i

Where:

* `elements` &ndash; a list of space-separated element names or an asterisk (`*`) character,
* `attributes` &ndash; a comma-separated list of attribute names or an asterisk (`*`) character,
* `styles` &ndash; a comma-separated list of style names or an asterisk (`*`) character,
* `classes` &ndash; a comma-separated list of classes or an asterisk (`*`) character.

Special characters:

* An asterisk used in the element list means: "This rule accepts the following properties for all elements, but not the elements themselves; there has to be another rule accepting these elements explicitly". The asterisk cannot be used as a part of an element name &mdash; e.g. `'h*'` is invalid and will not match `<h1>`.
* An asterisk used as the only property in the property list means: "Accept all properties".
* An asterisk used as part of a property name means a wildcard accepting 0 or more characters.
* An exclamation mark (`!`) used before an item name (e.g.: `[!href]`) in the property list means: "This property is required. If an element does not have it, this rule should not be applied to the element (so the element will not be validated by it)".
* A combination of an exclamation mark and a wildcard (e.g.: `[!data-*]`) means that an element must have at least one data attribute.

Examples:

	// A rule accepting <p> and <h1> elements, but without any property.
	p h1

	// A rule accepting <p> and <h1> elements with optional "left" and "right" classes.
	// Note: Both elements may contain these classes, not only <h1>.
	p h1(left,right)

	// A rule accepting <p> and <h1> elements with all their attributes.
	p h1[*]

	// A rule accepting <p> and <h1> elements with all their attributes
	// starting from 'data-'.
	p h1[data-*]

	// A rule accepting <a> only if it contains the "href" attribute.
	a[!href]

	// A rule accepting <img> with a required "src" attribute and an optional
	// "alt" attribute plus optional "width" and "height" styles.
	img[alt,!src]{width,height}

	// The same as above, because the order of properties and their lists is irrelevant and white-spaces are ignored.
	img { height, width } [ !src, alt ]

The Allowed Content Rules set may consist of many rules separated by semicolon (`;`) characters. Examples:

	// Rules allowing:
	// * <p> and <h1> elements with an optional "text-align" style,
	// * <a> with a required "href" attribute,
	// * <strong> and <em> elements,
	// * <p> with an optional "tip" class (so <p> element may contain
	//	a "text-align" style and a "tip" class at the same time).
	p h1{text-align}; a[!href]; strong em; p(tip)

	// Rules allowing:
	// * <p> and <h1> elements with an optional "id" attribute,
	// * <a> with a required "href" attribute and an optional "id" attribute.
	p h1; a[!href]; *[id]


### Debugging

In order to verify if Allowed Content Rules were parsed correctly, you can check the {@link CKEDITOR.filter#allowedContent} property of the {@link CKEDITOR.editor#filter} object.

	var editor = CKEDITOR.replace( 'textarea_id', {
		allowedContent: 'a[!href]; ul; li{text-align}(someclass)'
	} );

	editor.on( 'instanceReady', function() {
		console.log( editor.filter.allowedContent );
	} );

	// This will log the following array:
	// { elements: 'p br', ... } (default editor rules)
	// { elements: 'a', attributes: '!href' }
	// { elements: 'ul' }
	// { elements: 'li', styles: 'text-align', classes: 'someclass' }


## Object Format

Allowed Content Rules can also be defined as a standard object literal so the following:

	allowedContent: 'p h1{text-align}; a[!href]; strong em; p(tip)'

is an equivalent of:

	allowedContent: {
		'p h1': {
			styles: 'text-align'
		},
		a: {
			attributes: '!href'
		},
		'strong em': true,
		p: {
			classes: 'tip'
		}
	}

With this approach, Allowed Content Rules can be generated dynamically by JavaScript
or stored for any purposes in the JSON data format. Please note that object literal keys
**must be unique**, so:

	allowedContent: {
		p: {
			styles: 'text-align'
		},
		p: {
			classes: 'tip'
		}
	}

is an equivalent of:

	allowedContent: 'p(tip)'

but never:

	allowedContent: 'p{text-align}(tip)'

### Special Features

The object format has a few more features than the string format. First of all, it does not have to be parsed, so some special characters which the string format will not accept, can be used as element or property names in the object format.

Element and property names can also be specified in more variants &mdash; as objects (fastest) or arrays (less recommended &mdash; may be slower). For example:

	allowedContent: {
		img: {
			attributes: [ '!src', 'alt', width', 'height' ],
			classes: { tip: true }
		},
		// $<n> is a rule name - it does not match element names.
		// These rules will allow <h1> and <h2> elements with all their data-* attributes.
		'$1': {
			elements: { h1: true, h2: true },
			attributes: 'data-*'
		}
	}

Two more interesting properties are `match` and `propertiesOnly`.

The `match` property is a callback executed with the element being filtered. If it returns `true`, the rule will be applied to the element; if `false` &mdash; it will not be applied to the element at all.

The `propertiesOnly` property means that this rule will only accept properties &mdash; the element itself must be accepted by another rule. This is especially useful for plugin authors, who only want to extend allowed properties lists of elements already allowed by other features about which this plugin may not know.

	allowedContent: {
		// A rule applied only to <span>s having data-foo or data-bar attribute.
		span: {
			match: function( element ) {
				return element.attributes[ 'data-foo' ] || element.attributes[ 'data-bar' ];
			},
			attributes: 'data-foo,data-bar'
		},
		// These two rules will allow <h1> element and its 'foo' class.
		// They do not allow <h2> and <h3> elements.
		h1: true,
		'h1 h2 h3': {
			propertiesOnly: true,
			classes: 'foo'
		}
	}

## Further Reading

Refer to the following resources for more information about content filtering:

* The [Content Filtering (ACF)](#!/guide/dev_acf) article explains some ACF use cases and the rationale behind this feature.
* The [Advanced Content Filer](#!/guide/dev_advanced_content_filter) article contains more in-depth technical details about ACF.
* The [Disallowed Content](#!/guide/dev_disallowed_content) article explains how blacklisting works in ACF.
* The [Integrating Plugins with Advanced Content Filter](#!/guide/plugin_sdk_integration_with_acf) article explains how to adjust custom plugins to properly implement content filtering.
