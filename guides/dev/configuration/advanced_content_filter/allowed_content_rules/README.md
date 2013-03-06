# Allowed Content Rules

**Note:** [Advanced Content Filter](#!/guide/dev_advanced_content_filter) was introduced in **CKEditor 4.1**.

## Introduction

Allowed Content Rules define which HTML elements, attributes, styles and classes are allowed. When configuring CKEditor you will be mostly interested in setting the {@link CKEDITOR.config#allowedContent} option. Plugins developers will be also interested in setting {@link CKEDITOR.feature#allowedContent} properties which tells editor what kind of content this feature allows in [automatic mode](#!/guide/dev_advanced_content_filter-section-2).

Allowed Content Rule usually consists of four main parts:

* the **elements names list** which it allows,
* the **attributes list** which these elements may have,
* the **styles list** which these elements may have,
* the **classes list** which these elements may have.

**Note:** Instead of writing "attributes, styles and classes" we will use "**properties**" as a shorthand.

There may exist many rules for one element and one element may be included in many elements names lists. For example each of them may allow other set of attributes, styles or classes.

Rules are applied one by one. Initially element being filtered is invalid and all its properties are rejected. The first rule applied to the element validates it (it will not be removed) and that rule may accept some of element's properties. Next rules may accept next properties. Therefore:

* if there are no rules for an element it is removed,
* it is possible to accept an element, but reject all its properties which will be then removed,
* once validated element or its property cannot be invalidated by another rule.

## String format

String format is a compact notation of Allowed Content Rules, but it does not have all features of the object format. However, it should be sufficient in most cases.

Rule format:

	elements list [attributes list]{styles list}(classes list)

	Regexp pattern:
	 <   elements   ><                       styles, attributes and classes                        >< separator >
	/^([a-z0-9*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,

Where:

* `elements list` is a list of space separated elements names or an asterisk (`*`) character,
* `attributes list` is a comma separated list of attributes names or an asterisk (`*`) character,
* `styles list` is a comma separated list of styles names or an asterisk (`*`) character,
* `classes list` is a comma separated list of classes or an asterisk (`*`) character.

Special characters:

* asterisk used in elements list means: "this rule accepts following properties for all elements, but not the elements themselves; there has to be another rule accepting these elements explicitly".
* asterisk used in properties list means: "accept all properties".
* exclamation mark (`!`) used before item name (e.g.: `[!href]`) in properties list means: "this property is required, if element does not have it, then this rule should not be applied to this element (so this element will not be validated by it)".

Examples:

	// Rule accepting <p> and <h1> elements, but without any property.
	p h1

	// Rule accepting <p> and <h1> elements with optional "left" and "right" classes.
	// Note: Both elements may have these classes, not only <h1>.
	p h1(left,right)

	// Rule accepting <p> and <h1> elements with all their attributes.
	p h1[*]

	// Rule accepting <a> only if it has "href" attribute.
	a[!href]

	// Rule accepting <img> with required "src" attribute and optional "alt" plus optional "width" and "height" styles.
	img[alt,!src]{width,height}

	// The same as above, because order of properties and their lists is irrelevant and white-spaces are ignored.
	img { height, width } [ !src, alt ]

Allowed Content Rules set may consist of many rule separated by semicolon (`;`) character. Examples:

	// Rules allowing:
	// * <p> and <h1> elements with optional "text-align" style,
	// * <a> with required "href" attribute,
	// * <strong> and <em> elements,
	// * <p> with optional "tip" class (so <p> element may have
	//	"text-align" style and "tip" class at the same time).
	p h1{text-align}; a[!href]; strong em; p(tip)

	// Rules allowing:
	// * <p> and <h1> elements with optional "id" attribute,
	// * <a> with required "href" attribute and optional "id" attribute.
	p h1; a[!href]; *[id]


### Debugging

To verify if Allowed Content Rules were correctly parsed you can check the {@link CKEDITOR.filter#allowedContent} property of the {@link CKEDITOR.editor#filter} object.

	var editor = CKEDITOR.replace( 'textarea_id', {
		allowedContent: 'a[!href]; ul; li{text-align}(someclass)'
	} );

	editor.on( 'instanceReady', function() {
		console.log( editor.filter.allowedContent );
	} );

	// Will log this array:
	// { elements: 'p br', ... } (default editor's rules)
	// { elements: 'a', attributes: '!href' }
	// { elements: 'ul' }
	// { elements: 'li', styles: 'text-align', classes: 'someclass' }


## Object format

Coming soon...