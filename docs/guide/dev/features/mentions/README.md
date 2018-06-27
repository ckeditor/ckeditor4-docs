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

This plugin provides smart completion feature for custom text matches based on user input. Every time when user type selected marker he will get information about available, existing options.

## Usage

The mentions plugin shows a dropdown with available options every time when user types matching text preceded by a _marker_ character.

{@img assets/img/mentions_01.png Using mentions to get user hints.}

When you press <kbd>enter</kbd> or <kbd>tab</kbd> key suggested value will be inserted into an editor.

## Configuration

Mentions plugin is configurable using {@linkapi CKEDITOR.config.mentions editor config}. Refer to {@link guide/dev/configuration/README Setting CKEditor Configuration} guide for more information about CKEditor configuration.

```javascript
// Passing mentions configuration when creating editor.
CKEDITOR.replace( 'editor', {
		mentions: [ { feed: ['Anna', 'Thomas', 'John'], minChars: 0 } ]
} );

// You could also set it up globally.
CKEDITOR.config.mentions = [ { feed: ['Anna', 'Thomas', 'John'], minChars: 0 } ];
```

To get mentions to work you should configure data feed of items to be displayed in mentions dropdown. There are three different ways to create data feed:

* A simple array of text matches.
* An URL string of backend that will respond with a list of items in JSON format.
* A function allowing to use asynchronous callback to customize data source.

You can create multiple mention instances attached to an editor with different markers.

### Setting up synchronous data feed

The easiest way to configure data feed is to provide an array of text matches. Mentions plugin will use synchronous data feed and create item IDs by itself.

```javascript
config.mentions = [ { feed: ['Anna', 'Thomas', 'John'] } ];
```

By default query matching for an array feed is case insensitive. You can change this behavior by changing {@linkapi CKEDITOR.plugins.mentions.configDefinition.caseSensitive caseSensitive} configuration option.

### Asynchronous backend URL

You can provide a backend URL string which will be used to fetch text matches from custom endpoint service. Each time when a user types matching text into an editor your backend service will be queried for text matches. Ajax URL request should response with an array of matches in JSON format.

A backend URL string features `encodedQuery` special variable replaced with a mentions query. `encodedQuery` variable allows you to create customized URL e.g. for query `@anna` and the given URL `/users?name={encodedQuery}` your endpoint service will be queried with `/users?name=anna`.

```javascript
config.mentions = [ { feed: '/users?query={encodedQuery}' } ];
```

To avoid multiple HTTP requests to your endpoint service each HTTP response is cached by default and shared globally. To disable caching use {@linkapi CKEDITOR.plugins.mentions.configDefinition.cache cache} configuration option.

### Asynchronous callback

This method is recommended for advanced users who would like to take full control of the data feed. It allows you to provide data feed as an function which accepts two parameters: `options` and `callback`. Provided function will be called every time when user types matching text into an editor. The `options` object contains information about current query and a marker.

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

When using asynchronous method i.e. backend URL string or a callback function, you should provide correct object structure. See {@link guide/dev/features/autocomplete/README#data-callback autocomplete data callback guide} for more information about required item properties.

## Customizing text matching

You are not forced to stick to default mentions text matching. It could be customized by special marker character and a number of minimal characters required to start data querying.

You can easily configure this options by setting {@linkapi CKEDITOR.plugins.mentions.configDefinition.minChars minChars} and {@linkapi CKEDITOR.plugins.mentions.configDefinition.marker marker} options.

```javascript
config.mentions = [ {
	feed: feed,
	minChars: 3,
	marker: '#'
} ];
```

With the above configuration you will get completion hints after 3 characters started with `#`.

## Templating

Templating is configurable by {@linkapi CKEDITOR.plugins.mentions.configDefinition.itemTemplate itemTemplate} and {@linkapi CKEDITOR.plugins.mentions.configDefinition.outputTemplate outputTemplate} options. Templating allows you to create customized dropdown view and a format of accepted item.

{@img assets/img/mentions_02.png Using mentions with custom item template.}

See {@link guide/dev/features/autocomplete/README#templating autocomplete templating guide} for more details.

## Throttling

Throttling is configurable by {@linkapi CKEDITOR.plugins.mentions.configDefinition.throttle} option. See {@link guide/dev/features/autocomplete/README#throttling autocomplete throttling guide} for more details.

## Mentions Demo

See the [working "Mentions" sample](https://sdk.ckeditor.com/samples/mentions.html) how mentions helps to create useful completion system saving your time and making mistakes.

## Related Features

Refer to the following resources for more information about autocomplete features:

* The {@link guide/dev/features/autocomplete/README Autocomplete} article explains how to implement smart completion for custom text matches based on user input.
* The {@link guide/dev/features/emoji/README Emoji} article explains how to provide support for autocompleting emoji ideograms.
