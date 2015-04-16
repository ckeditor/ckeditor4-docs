<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Embedding Content

<p class="requirements">
	This feature was introduced in <strong>CKEditor 4.5</strong>. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="http://ckeditor.com/download">Download</a> site and <a href="#!/guide/dev_widget_installation">needs to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

The optional [Media Embed](http://ckeditor.com/addon/embed) and [Semantic Media Embed](http://ckeditor.com/addon/embedsemantic) plugins introduce two new widget types &mdash; an embedded media and an embedded media with a semantic output.

Both widgets allow to embed resources (videos, images, tweets, etc.) hosted by another services (called the "content providers") in the editor. By default the plugins use [Iframely](https://iframely.com/) proxy service which supports over [1715 content providers](https://iframely.com/domains) such as [YouTube](http://youtube.com), [Vimeo](http://vimeo.com), [Twitter](http://twitter.com), [Instagram](http://instagtram.com), [Imgur](http://imgur.com), [GitHub](http://github.com), [Google Maps](maps.google.com).

## Media Embed vs Semantic Media Embed

The difference between Media Embed and Semantic Media Embed is that the first will include in the data the entire HTML needed to display the resource, while the latter only an `<oembed>` tag with the URL to the resource. Example for the

Media Embed:

	<div data-oembed-url="https://twitter.com/reinmarpl/status/573118615274315776">
		<blockquote class="twitter-tweet">
			<p>Coding session with <a href="https://twitter.com/fredck">@fredck</a>, <a href="https://twitter.com/anowodzinski">@anowodzinski</a> and Mr Carrot. <a href="http://t.co/FLV5UXpfaT">pic.twitter.com/FLV5UXpfaT</a></p>
			&mdash; Piotrek Koszuliński (@reinmarpl) <a href="https://twitter.com/reinmarpl/status/573118615274315776">March 4, 2015</a>
		</blockquote>
		<script async="" charset="utf-8" src="//platform.twitter.com/widgets.js"></script>
	</div>

Semantic Media Embed:

	<oembed>https://twitter.com/reinmarpl/status/573118615274315776</oembed>

This difference makes the Media Embed plugin perfect for systems where the embedding feature should work out of the box. The Semantic Media Embed plugin is useful for rich content managment systems which store only pure, semantical content ready for a later processing. For instance, a CMS may display different result on desktop browsers, different on mobile ones and different for print version of a website.

## Configuring Content Provider

Both widgets can be easily [configured](#!/api/CKEDITOR.config-cfg-embed_provider) to use other [oEmbed](http://www.oembed.com/) provider or custom services.

## Implementing a New Embed Widgets

Both plugins use the {@link CKEDITOR.plugins.embedBase#createWidgetBaseDefinition Embed Base API} exposed by the [Embed Base plugin](http://ckeditor.com/addon/embedbase) which can be used to implement other types of widgets for embedding asynchronously retrieved content.