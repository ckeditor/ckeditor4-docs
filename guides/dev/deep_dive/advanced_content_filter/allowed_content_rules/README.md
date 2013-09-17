# Allowed Content Rules

**Note:** [Advanced Content Filter](#!/guide/dev_advanced_content_filter) was introduced in **CKEditor 4.1**.

## Introduction

Allowed Content Rules define which HTML elements, attributes, styles, and classes are allowed. When configuring CKEditor you will be mostly interested in setting the {@link CKEDITOR.config#allowedContent} option. Plugin developers will also need to set {@link CKEDITOR.feature#allowedContent} properties which tell the editor what kind of content a feature allows in [automatic mode](#!/guide/dev_advanced_content_filter-section-2).

Allowed Content Rule usually consists of four main parts:

* the **elements** that it allows,
* the **attributes** that these elements may have,
* the **styles** that these elements may have,
* the **classes** that these elements may have.

**Note:** Instead of writing "attributes, styles, and classes", "**properties**" will be used as a shorthand.

Multiple rules may exist for one element and one element may be included in numerous element lists. For example each of the rules may allow another set of element properties.

Rules are applied one by one. Initially the element being filtered is invalid and all its properties are rejected. The first rule applied to the element validates it (it will not be removed) and that rule may accept some element properties. Another rule may cause the editor to accept further element properties. Therefore:

* If there are no rules for an element it is removed.
* It is possible to accept an element, but reject all its properties which will then be removed.
* Once validated, an element or its property cannot be invalidated by another rule.

## String Format

The string format is a compact notation for Allowed Content Rules, but it does not offer all features available in the object format. However, in most cases it should be sufficient.

Rule format:

	elements [attributes]{styles}(classes)

	Regexp pattern:
	 <   elements   ><                       styles, attributes, and classes                       >< separator >
	/^([a-z0-9*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,

Where:

* `elements` &ndash; a list of space-separated element names or an asterisk (`*`) character,
* `attributes` &ndash; a comma-separated list of attribute names or an asterisk (`*`) character,
* `styles` &ndash; a comma-separated list of style names or an asterisk (`*`) character,
* `classes` &ndash; a comma-separated list of classes or an asterisk (`*`) character.

Special characters:

* Asterisk used in the element list means: "This rule accepts the following properties for all elements, but not the elements themselves; there has to be another rule accepting these elements explicitly".
* Asterisk used in the property list means: "Accept all properties".
* Exclamation mark (`!`) used before an item name (e.g.: `[!href]`) in the property list means: "This property is required. If an element does not have it, this rule should not be applied to the element (so the element will not be validated by it)".

Examples:

	// A rule accepting <p> and <h1> elements, but without any property.
	p h1

	// A rule accepting <p> and <h1> elements with optional "left" and "right" classes.
	// Note: Both elements may contain these classes, not only <h1>.
	p h1(left,right)

	// A rule accepting <p> and <h1> elements with all their attributes.
	p h1[*]

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
