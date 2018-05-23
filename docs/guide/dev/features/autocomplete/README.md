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

This plugins provides smart completion feature for custom text matches based on user input. Every time when user type character he will get information about available, existing options.

## Usage

The autocomplete plugin shows dropdown with available options every time when user types matching text.

{@img assets/img/autocomplete_01.png Using autocomplete to get ticket hints.}

When you press <kbd>enter</kbd>, <kbd>tab</kbd> or any other customized [`commitKeystroke`](https://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR.config#autocomplete_commitKeystrokes) suggested value will be inserted into editor. 

{@img assets/img/autocomplete_02.png Inserted autocomplete hint.}

## Configuration

Autocomplete plugin utilizes two important callbacks which allows you to customize matching function and data source:

* A text test callback.
* A data callback. 

They are required to setup autocomplete instance which will be immediately attached into editor after its creation.

Lets configure autocomplete plugin for simple list of GitHub tickets. Autocomplete can be configured by [`configDefinition`](https://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR_plugins_autocomplete.configDefition.html) object passed into autocomplete constructor.

```javascript
// We will update this object during this guide.
var config = {};
```

## Text test callback

A function which should return a fragment of text (typed in the editor) that should be autocompleted. This function works best with [`textmatch`](https://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR_plugins_textwatcher.html) feature which was published alongside with `autocomplete` plugin. Lets say you would like to create autocompletion feature for GitHub tickets. Depending on you use case, you could create autocomplete instance using this code:

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

## Data callback

A function which should return (through its callback) a suggestion data for the current query string. This function will be only called if the previous `textTestCallback` returned matching text. 

```javascript
// The itemsArray variable is our example "database".
var itemsArray = [
	{ id: 1, name: 'Introduce autocomplete feature', ticket: '134' },
	{ id: 2, name: 'Fix bug causing race condition', ticket: '156' },
	{ id: 3, name: 'First dropdown item should be preselected', ticket: '167' },
	{ id: 4, name: 'Write autocomplete dev guide', ticket: '233' }
];

// Returns (through its callback) the suggestions for the current query.
function dataCallback( query, range, callback ) {
	// Remove '#' tag.
	query = query.substrint( 1 );

	// Simple search.
	// Filter the entire items array so only the items that start
	// with the query remain.
	var suggestions = itemsArray.filter( function( item ) {
		return item.ticket.indexOf( query ) === 0;
	} );

	// Note - the callback function can also be executed asynchronously
	// so dataCallback can do an XHR requests or use any other asynchronous API.
	callback( suggestions );
}

config.dataCallback = dataCallback;
```

Pay attention to the data passed into `callback` argument - `id` and `name` properties are required. `ticket` property is optional and we will use it later.

## Templating

Autocomplete has very customizable templating feature. You can change dropdown template and accepted hint to get very different results.

Lets utilise our optional `ticket` property to get more interesting dropdown:

```javascript
config.viewTemplate = '<li data-id="{id}"><strong>{ticket}</strong> <i>{name}</i></li>';
```

And create some custom output:

```javascript
config.outputTemplate = '<a href="https://github.com/ckeditor/ckeditor-dev/issues/{ticket}">#{ticket}</a>';
```

Note that when creating custom `viewTemplate` you should use `li` element with `data-id="{id}"`. 

## Throttling

For performance reasons autocomplete plugin features throttling mitigating text checks. If you care about number of requests made into your endpoint service, you can set higher level of throttling. Note that it could cause visible delay for dropdown.

```javascript
config.throttle = 200;
```

Throttling implementation is based on [`CKEDITOR.tools.throttle`](https://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR_plugins_autocomplete.configDefition.html) feature. If you need more information how it works, refer to our docs.

## Final step

There is only one thing left to do - attach autocomplete into editor with our configuration. Fortunately it's very easy and can be done by creating new autocomplete instance.

```javascript
new CKEDITOR.plugins.autocomplete( editor, config );
```

## Autocomplete Demo

See the [working "Autocomplete" sample](https://sdk.ckeditor.com/samples/autocomplete.html) how autocomplete helps to create useful templating system saving your time and making mistakes.
