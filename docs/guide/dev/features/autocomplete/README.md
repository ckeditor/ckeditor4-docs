---
category: working-with-document
order: 30
url: guide/dev_autocomplete
menu-title: Autocomplete
meta-title-short: Autocomplete
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Autocomplete

<info-box info="">
    This feature was introduced in CKEditor 4.10. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

This plugins provides contextual completion feature for custom text matches based on user input. Every time when user type character he will get information about available, existing options.

## Usage

The autocomplete plugin shows dropdown with available options every time when user types matching text.

{@img assets/img/autocomplete_01.png Using autocomplete to get ticket hints.}

When you press <kbd>enter</kbd>, <kbd>tab</kbd> or any other customized {@linkapi CKEDITOR.config.autocomplete_commitKeystrokes `commitKeystrokes`} suggested value will be inserted into editor.

## Configuration

Autocomplete plugin utilizes two callbacks to customize matching and data feed:

* A text test callback.
* A data callback.

They are required to setup autocomplete instance which will be immediately attached into editor after its creation. Autocomplete can be configured by {@linkapi CKEDITOR.plugins.autocomplete.configDefinition configDefinition} object passed into autocomplete constructor.

```javascript
// We will update this object during this guide.
var config = {};
```

### Text test callback

A function which should return a fragment of text (typed in the editor) that should be autocompleted. This function works best with {@linkapi CKEDITOR.plugins.textMatch textMatch} feature which was published alongside with `autocomplete` plugin. Lets say you would like to create autocompletion feature for GitHub tickets. Depending on you use case, you could create autocomplete instance using this code:

```javascript
// Called when the user types in the editor or moves the caret.
// The range represents the caret position.
function textTestCallback( range ) {
	// We don't want to autocomplete a non-empty selection.
	if ( !range.collapsed ) {
		return null;
	}

	// Use the textmatch plugin which does the tricky job of doing
	// a text search in the DOM. The matchCallback function should return
	// a matching fragment of the text.
	return CKEDITOR.plugins.textMatch.match( range, matchCallback );
}

// Returns a position of the matching text.
// It matches with text starting from the '#' character
// followed by spaces, up to the caret position.
function matchCallback( text, offset ) {
	// Get the text before the caret.
	var left = text.slice( 0, offset ),
		// Will look for an '#' character followed by word characters.
		match = left.match( /#\w$/ );

	if ( !match ) {
		return null;
	}
	return { start: match.index, end: offset };
}

config.textTestCallback = textTestCallback;
```

### Data callback

A function which should return (through its callback) a suggestion data for the current query string. This function will be only called if the previous `textTestCallback` returned matching text.

```javascript
// The itemsArray variable is our example "database".
var itemsArray = [
	{ id: 134, name: 'Introduce autocomplete feature' },
	{ id: 156, name: 'Fix bug causing race condition' },
	{ id: 167, name: 'First dropdown item should be preselected' },
	{ id: 244, name: 'Write autocomplete dev guide' }
];

// Returns (through its callback) the suggestions for the current query.
function dataCallback( query, range, callback ) {
	// Remove '#' tag.
	query = query.substring( 1 );

	// Simple search.
	// Filter the entire items array so only the items that start
	// with the query remain.
	var suggestions = itemsArray.filter( function( item ) {
		return String( item.id ).indexOf( query ) == 0;
	} );

	// Note - the callback function can also be executed asynchronously
	// so dataCallback can do an XHR requests or use any other asynchronous API.
	callback( suggestions );
}

config.dataCallback = dataCallback;
```

Pay attention to the data passed into `callback` argument - `id` and `name` properties are required. You should always provide correct object structure containing unique item ID. Although the `name` property is required when using `autocomplete` plugin with default item and output templates, it can be changed by custom templating.

### Templating

Autocomplete has very customizable templating feature. You can change dropdown template and accepted hint to get very different results.

Lets utilise item properties to get more interesting dropdown:

```javascript
config.itemTemplate = '<li data-id="{id}"><strong>{id}</strong> <i>{name}</i></li>';
```

And create some custom output:

```javascript
config.outputTemplate = '<a href="https://github.com/ckeditor/ckeditor-dev/issues/{id}">#{id}</a>';
```

Note that when creating custom `itemTemplate` you should use `li` element with `data-id="{id}"`.

### Throttling

For performance reasons autocomplete plugin features throttling mitigating text checks. If you care about number of requests made into your endpoint service, you can set higher level of throttling. Note that it could cause visible delay for dropdown.

```javascript
config.throttle = 200;
```

Throttling implementation is based on {@linkapi CKEDITOR.tools.throttle throttle} feature. If you need more information how it works, refer to our docs.

## Final step

There is only one thing left to do - attach autocomplete into editor with our configuration. Fortunately it's very easy and can be done by creating new autocomplete instance.

```javascript
new CKEDITOR.plugins.autocomplete( editor, config );
```

## Autocomplete Demo

See the [working "Autocomplete" sample](https://sdk.ckeditor.com/samples/autocomplete.html) how autocomplete helps to create useful templating system saving your time and making mistakes.
