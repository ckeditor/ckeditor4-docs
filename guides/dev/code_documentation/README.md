<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Code Documentation Standards

Starting from version 4 CKEditor uses a customized version of [JSDuck](https://github.com/ckeditor/jsduck) as code documentation generator; previously [JSDoc](http://code.google.com/p/jsdoc-toolkit/) was used.

JSDuck's comment format differs from JSDoc's and both generators have different feature lists. Thus, with CKEditor 4 release, the entire source code documentation was reformatted in a new, consistent way.

The resulting CKEditor API documentation is always available at <https://docs.ckeditor.com/ckeditor4/docs/#!/api>.

## Useful Links ##

* [CKEditor JSDuck customization](https://github.com/ckeditor/jsduck)
* [JSDuck GitHub page](https://github.com/senchalabs/jsduck)
* [JSDuck Wiki](https://github.com/senchalabs/jsduck/wiki/Guide)
* [Tags list](https://github.com/senchalabs/jsduck/wiki/@class)
* [Markdown format - basics](http://daringfireball.net/projects/markdown/basics)
* [CKEditor API documentation](#!/api)

## JSDuck vs JSDoc &mdash; Important Differences ##

* **JSDuck supports Markdown**. HTML entities may still be used, but try to avoid them in favor of Markdown. Note that HTML in code samples (indented blocks) and `pre-formatted` will be encoded.
* JSDuck does not accept the following tags: `@namespace`, `@name`, `@constant`, `@augments`, `@field`, `@type` (deprecated), `@default` and more (only those that CKEditor 3 was using are listed).
* JSDuck accepts some new tags: `@cfg`, `@member`, `@chainable`, `@inherits`, `@method`, `@mixins`, `@readonly`, `@singleton`, and [more](https://github.com/senchalabs/jsduck/wiki/@class).
* Some common tags have different format in JSDuck (e.g. `@example` creates live examples, standard code samples are just indented).
* JSDuck does not parse code searching for classes and properties. It will therefore only find those API elements which have at least their preceding `/** */` doc comments.
* JSDuck recognizes API element names (methods, classes, events, configuration variables, properties, etc.), method definitions (with argument lists), and properties (their type and default value, too, if possible). Thus, in some cases this information does not have to be specified.
* Classes' definitions can be opened multiple times &mdash; it is useful when class methods and properties are defined in more than one file or place in the code.
* There is no list of files in JSDuck, so old `@license` and `@fileOverview` tags are kept for other purposes (and thanks to [custom tags](https://github.com/senchalabs/jsduck/wiki/Custom-tags) they work in JSDuck like `@ignore`).
* There are no namespaces in JSDuck, so the packages tree is auto-generated based on the classes tree and `@member` tags.
* All properties, events, etc. defined under the class definition will be assigned to this class, so there is no need to specify `@member`.

## Documentation Formats ##

### File Header ###

The `@license` and `@fileOverview` tags are legacy comments that will not be parsed by JSDuck.

	/**
	 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
	 * For licensing, see LICENSE.md or http://ckeditor.com/license
	 */

	/**
	 * @fileOverview Defines the {@link CKEDITOR.editor} class that represents an
	 * editor instance.
	 */

**Note:** Since `@fileOverview` comments are ignored, they have not been reformatted, so they may still contain the old JSDoc format.

### Class ###

This is an example of a class definition. It contains so many tags to show their correct order.

	/**
	 * Represents an editor instance. This constructor should be rarely
	 * used, in favor of the {@link CKEDITOR} editor creation functions.
	 *
	 *		var editor = new CKEDITOR.editor();
	 *		editor.setSomething( name, {
	 *			value: 1
	 *		} );
	 *
	 * @since 3.0
	 * @private
	 * @class CKEDITOR.editor
	 * @extends CKEDITOR.parent
	 * @mixins CKEDITOR.event
	 * @mixins CKEDITOR.whatever
	 * @constructor Creates an editor class instance.
	 * @param {Object} [instanceConfig] Configuration values for this specific instance.
	 * @param {Number} [mode=CKEDITOR.SOURCE_MODE] The element creation mode to be used by this editor.
	 *
	 * Possible values are:
	 *
	 * * `CKEDITOR.SOURCE_MODE` - description 1,
	 * * `CKEDITOR.WYSIWYG_MODE` - description 2 long long long
	 *      long long long long long,
	 * * `CKEDITOR.ANOTHER_MODE` - description 3.
	 *
	 * @param {CKEDITOR.dom.element} [element] The DOM element upon which this editor
	 * will be created.
	 */
	CKEDITOR.editor = function( ) {
	// ...

A minimal class documentation:

	/**
	 * Represents an editor instance. This constructor should be rarely
	 * used, in favor of the {@link CKEDITOR} editor creation functions.
	 *
	 * @class
	 */
	CKEDITOR.editor = function() {
	// ...

When you want to reopen the class declaration in another file, use this:

	/** @class CKEDITOR.editor */

#### Details ####

The order of tags may look strange, but you can remember it thanks to the following description:

> Since 3.0 there is a private class `CKEDITOR.editor` which extends `CKEDITOR.parent` and mixins `CKEDITOR.event` and `CKEDITOR.whatever`.
>
> It has a private constructor (switched order &mdash; explained later in the tags list) which accepts the following parameters: ...

Important tag details:

* By default private classes will not be visible in the packages tree.
* A good example of the difference between "mixins" and "extends" is that `CKEDITOR.event` is mixed in various other classes and the `CKEDITOR.dom.*` structure is based on extending parent classes.
* A constructor is in fact a separate documentation "instance", because it will be listed with methods. Thus, it may have its own `@private`, but it has to be placed below it, because everything before will be a part of the class description. However, two `@private` tags in one comment will not be accepted by JSLinter, so in this case the documentation should be split into two comments.

	A constructor can also be declared completely independently from the class, which is useful when `CKEDITOR.tools.createClass` has been used.

### Property and Configuration Variable ###

The following is an example of property documentation.

	/**
	 * A unique identifier of this editor instance.
	 *
	 * **Note:** It will be originated from the ID or the name
	 * attribute of the `element`, otherwise a name pattern of
	 * 'editor{n}' will be used.
	 *
	 * @private
	 * @readonly
	 * @static
	 * @property {String/Boolean} [complicatedName=default value]
	 * @member CKEDITOR.editor
	 */
	obj[ 'complicated' + 'Name' ] = this.name || genEditorName();

A minimal property documentation:

	/**
	 * Property description (even this may be omitted, but it is better to always describe a property).
	 */
	this.propertyName = 'value';

Which will be recognized as `@property {String} [propertyName='value']` by JSDuck and will be assigned to the class defined earlier in the file.

Partial:

	/**
	 * Property description.
	 *
	 * @property {String} [=config.something (value taken from configuration)]
	 */
	this.propertyName = this.config.something;

Basic:

	/**
	 * Property description.
	 *
	 * @property propertyName
	 */
	this.propertyName = this.config.something;

#### Details ####

* JSDuck type definitions are awesome &mdash; [read more about them](https://github.com/senchalabs/jsduck/wiki/Type-Definitions).
* Property names, types, and default values may be recognized automatically.
* The default value does not have to be JavaScript code, so in the "Partial" example JSDuck will print: "Defaults to: config.something (value taken from configuration)".
* If a property is not defined below a class definition or if it belongs to a different class, then `@member` has to be used. Specifying a namespace in `@property` is not possible.

#### Configuration Variables ####

To define a configuration variable instead of a property:

* Use `@cfg` instead of `@property`. The format is the same.
* `@private`, `@readonly`, `@static` may not work (have not been tested).

### Method and Event ###

The following is an example of method documentation.

	/**
	 * The {@link CKEDITOR.dom.element} representing an element. If the
	 * element is a native DOM element, it will be transformed into a valid
	 * CKEDITOR.dom.element object.
	 *
	 *		var element = new CKEDITOR.dom.element( 'span' );
	 *		alert( element == CKEDITOR.dom.element.get( element ) ); // true
	 *
	 *		var element = document.getElementById( 'myElement' );
	 *		alert( CKEDITOR.dom.element.get( element ).getName() ); // (e.g.) 'p'
	 *
	 * @private
	 * @static
	 * @method complicatedName
	 * @member CKEDITOR.editor
	 * @param {String/Object} element Element's ID or name or a native DOM element.
	 * @param {Function} fn Callback.
	 * @param {String} fn.firstArg Callback's first argument.
	 * @param {Number} fn.secondArg Callback's second argument.
	 * @param {String} [name='default value']
	 * @returns {CKEDITOR.dom.element} The transformed element.
	 */
	this[ 'complicated' + 'Name' ] = (function() {
		return function() {
		};
	}());

Typical:

	/**
	 * Method description.
	 *
	 * @param {String/Object} element Element's ID or name or a native DOM element.
	 * @param {String} [name='default value']
	 * @returns {CKEDITOR.dom.element} The transformed element.
	 */
	this.methodName = function() {
		// ...
	};

#### Details ####

* The `@method` tag has to be used when it is not clear that a piece of code is a method (e.g. a closure returning a function was used or a reference to a function defined elsewhere) or when the method's name is not obvious.
* Callback arguments may be defined. Also, if a method returns an object, its properties may be defined too &mdash; [read more](https://github.com/senchalabs/jsduck/wiki/@return).
* Both `@return` and `@returns` are accepted, but use the latter one.

#### Events ####

To define an event instead of a method:

* Use `@event` instead of `@method` &mdash; usually you will have to provide a name.
* `@returns` is not accepted.

## Miscellaneous Rules ##

* Always leave one blank line between the textual comment and the first tag.
* Separate all blocks (paragraphs, code samples, etc.) with one blank line.
* Code samples are indented with at least two tabs after `*` and remember &mdash; **no spaces** are to be used.
* Always place a dot (`.`) at the end of a sentence. A sentence starts with an upper-case letter.
* Always use single quotes for JavaScript strings, but double quotes for cites, irony, etc. in textual comments.
* Cross-reference format for links is: `CKEDITOR.name.space#property`. If there is more than one event/property/configuration/method with the same name, then prepend `cfg-`, `property-`, `method-` or `event-` to the name. The namespace may be omitted if it equals to `@member` or the current class. See the ["Cross-references"](https://github.com/senchalabs/jsduck/wiki/Guide#cross-references) section in the JSDuck's guide.
* Use real format in default values: `CKEDITOR.name.space.property`.
* When describing the value returned or alerted in the code sample, wrap only strings in `''`. All other types (Boolean, numbers, objects, etc.) should be left unwrapped.
* There is no Integer type in JavaScript and constructors' names should be used as types names &mdash; so Boolean, not boolean.
* In textual comments wrap tokens, names from code, JavaScript values, etc. with <code>\`\`</code> for better visibility. Remember to wrap strings with `''` &mdash; so: <code>This method may return: \`'text text'\`.</code>
