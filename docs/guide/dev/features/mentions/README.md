---
category: working-with-document
order: 40
url: guide/dev_mentions
menu-title: Mentions and Tags
meta-title-short: Mentions
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Mentions and Tags

<info-box info="">
    This feature was introduced in CKEditor 4.10. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The mentions and tags features provide smart completion functionality for custom text matches based on user input. Every time the user types the pre-configured marker, such as `@` or `#`, they get information about available autocomplete options displayed in a dedicated dropdown. The provided suggestion can be quickly selected and inserted into content.

The [Mentions](https://ckeditor.com/cke4/addon/mentions) plugin that provides this functionality is an implementation of the {@link guide/dev/features/autocomplete/README Autocomplete} feature. The differences between the two plugins are as follows:

* Autocomplete is more generic, flexible, with a more complex API that lets you precisely control what is being matched and how. It requires a considerable amount of code to implement it (see the {@link guide/dev/features/autocomplete/README#implementing-custom-autocomplete tutorial}.
* Mentions is a simple autocomplete implementation with a basic API that works out of the box and can be set up with configuration alone.

## Usage

The Mentions plugin shows a dropdown with available options every time the user types a matching text preceded by a pre-configured {@linkapi CKEDITOR.plugins.mentions.configDefinition#marker marker} character (defaults to `@`).

{@img assets/img/mentions_01.png Using mentions to get user hints.}

When you press the <kbd>Enter</kbd> or <kbd>Tab</kbd> key, the suggested value will be inserted into the editor.

## Configuration

Mentions plugin is configurable using the {@linkapi CKEDITOR.config.mentions `config.mentions`} option. Refer to {@link guide/dev/configuration/README Setting CKEditor Configuration} guide for more information about setting CKEditor configuration.

```javascript
// Passing mentions configuration when creating the editor.
CKEDITOR.replace( 'editor', {
		mentions: [ { feed: ['Anna', 'Thomas', 'John'], minChars: 0 } ]
} );

// You can also set it up globally.
CKEDITOR.config.mentions = [ { feed: ['Anna', 'Thomas', 'John'], minChars: 0 } ];
```

To get mentions to work you should {@linkapi CKEDITOR.plugins.mentions.configDefinition#feed configure the data feed} of items to be displayed in the mentions dropdown. There are three different ways to create a data feed:

* A simple array of text matches.
* A URL string to the backend endpoint that will respond with a list of items in the JSON format.
* A function allowing to use an asynchronous callback to customize the data source.

You can create multiple mentions instances attached to an editor with different markers:

```js
CKEDITOR.config.mentions = [
	{
		feed: [ 'Anna', 'Thomas', 'John' ],
		marker: '@'
	},
	{
		feed: '/tags?name={encodedQuery}',
		marker: '#'
	}
];
```

### Setting up a synchronous data feed

The easiest way to configure the data feed is to provide an array of text matches. The Mentions plugin will use a synchronous data feed and create item IDs by itself.

```javascript
config.mentions = [ { feed: ['Anna', 'Thomas', 'John'] } ];
```

By default query matching for an array feed is case insensitive. You can modify this behavior by changing the {@linkapi CKEDITOR.plugins.mentions.configDefinition.caseSensitive} configuration option.

### Asynchronous backend URL

You can provide a backend URL string which will be used to fetch text matches from a custom endpoint service. Each time the user types matching text into the editor your backend service will be queried for text matches. An Ajax URL request should response with an array of matches in the JSON format.

A backend URL string features a special `encodedQuery` variable replaced with the mentions query. The `encodedQuery` variable allows you to create a customized URL. For example, for the query `@anna` and the given URL `/users?name={encodedQuery}` your endpoint service will be queried with `/users?name=anna`.

```javascript
config.mentions = [ { feed: '/users?query={encodedQuery}' } ];
```

To avoid multiple HTTP requests to your endpoint service, each HTTP response is cached by default and shared globally. To disable caching use the {@linkapi CKEDITOR.plugins.mentions.configDefinition.cache} configuration option.

### Asynchronous callback

This method is recommended for advanced users who would like to take full control of the data feed. It allows you to provide the data feed as a function that accepts two parameters: `options` and `callback`. The provided function will be called every time the user types matching text into the editor. The `options` object contains information about the current query and the marker.

Depending on your use case, you can use this code as an example boilerplate to create your own function feed:

```javascript
config.mentions = [ {
	feed: function( options, callback ) {
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if ( xhr.readyState == 4 ) {
				if ( xhr.status == 200 ) {
					callback( JSON.parse( this.responseText ) );
				} else {
					callback( [] );
				}
			}
		}

		xhr.open( 'GET', '/users?name=' + encodeURIComponent( options.query ) );
		xhr.send();
	}
} ];
```

## Data items structure

When using the asynchronous method, for example a backend URL string or a callback function, you should provide a correct object structure. See the {@link guide/dev/features/autocomplete/README#data-callback Autocomplete Data Callback guide} for more information about required item properties.

## Customizing text matching

You are not forced to stick to default mentions text matching. Text matching can be customized by setting a custom marker character and the minimum number of characters required to start data querying.

You can easily configure this options by setting the {@linkapi CKEDITOR.plugins.mentions.configDefinition.minChars} and {@linkapi CKEDITOR.plugins.mentions.configDefinition.marker} options.

```javascript
config.mentions = [ {
	feed: feed,
	minChars: 3,
	marker: '#'
} ];
```

With the configuration above you will get completion hints after 3 characters started with a `#`.

## Templating

Templating is configurable by using the {@linkapi CKEDITOR.plugins.mentions.configDefinition.itemTemplate} and {@linkapi CKEDITOR.plugins.mentions.configDefinition.outputTemplate} options. Templating allows you to create a customized dropdown view and the format of accepted item.

{@img assets/img/mentions_02.png Using mentions with a custom item template.}

Refer to the {@link guide/dev/features/autocomplete/README#templating Autocomplete Templating guide} for more details.

## Throttling

Throttling is configurable by using the {@linkapi CKEDITOR.plugins.mentions.configDefinition.throttle} option. See the {@link guide/dev/features/autocomplete/README#throttling Autocomplete Throttling guide} for more details.

## Mentions Demo

See the {@linksdk mentions working "Mentions, Tags and Emoji" sample} to check how mentions helps create a useful completion system for user name mentions and tags, saving your time and limiting the opportunity to make mistakes.

## Related Features

Refer to the following resources for more information about autocomplete features:

* The {@link guide/dev/features/autocomplete/README Autocomplete} article explains how to implement smart completion for custom text matches based on user input.
* The {@link guide/dev/features/emoji/README Emoji} article explains how to provide support for autocompleting emoji ideograms.
