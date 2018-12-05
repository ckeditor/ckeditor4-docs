---
category: inserting-content
order: 100
url: guide/dev_media_embed
menu-title: Embedding Media Resources
meta-title-short: Embedding Media Resources
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Embedding Media Resources with oEmbed

<info-box info="">
 This feature was introduced in <strong>CKEditor 4.5</strong>. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/widget_installation/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>. In order to enable the plugin you need to {@link guide/dev/features/embed/README#configuring-the-content-provider configure the content provider} first.
</info-box>

The optional [Media Embed](https://ckeditor.com/cke4/addon/embed) and [Semantic Media Embed](https://ckeditor.com/cke4/addon/embedsemantic) plugins introduce two new {@link guide/dev/deep_dive/widgets/README widget} types &mdash; an embedded media resource and an embedded media resource with a semantic output.

{@img assets/img/mediaembed_01.png An article with a YouTube video and a tweet embedded}

Both widgets allow to embed resources (videos, images, tweets, etc.) hosted by other services (called the "content providers") in the editor. In order to use the widget, you need to set up the content provider in your editor configuration first. We recommend to use the [Iframely](https://iframely.com/) proxy service which supports over [1800 content providers](https://iframely.com/domains) such as [YouTube](http://youtube.com), [Vimeo](http://vimeo.com), [Twitter](http://twitter.com), [Instagram](http://instagtram.com), [Imgur](http://imgur.com), [GitHub](http://github.com), or [Google Maps](https://maps.google.com).

## Media Embed vs Semantic Media Embed

The difference between Media Embed and Semantic Media Embed is that the first will include the entire HTML needed to display the resource in the data, while the latter will only include an `<oembed>` tag with the URL to the resource. See the following examples:

Media Embed:

	<div data-oembed-url="https://twitter.com/reinmarpl/status/573118615274315776">
		<blockquote class="twitter-tweet">
			<p>Coding session with <a href="https://twitter.com/fredck">@fredck</a>, <a href="https://twitter.com/anowodzinski">@anowodzinski</a> and Mr Carrot. <a href="http://t.co/FLV5UXpfaT">pic.twitter.com/FLV5UXpfaT</a></p>
			&mdash; Piotrek Koszuliński (@reinmarpl) <a href="https://twitter.com/reinmarpl/status/573118615274315776">March 4, 2015</a>
		</blockquote>
		<script async charset="utf-8" src="//platform.twitter.com/widgets.js"></script>
	</div>

Semantic Media Embed:

	<oembed>https://twitter.com/reinmarpl/status/573118615274315776</oembed>

This difference makes the Media Embed plugin perfect for systems where the embedding feature should work out of the box. The Semantic Media Embed plugin is useful for rich content managment systems that store only pure, semantic content ready for further processing. For instance, a CMS may display a different result in desktop browsers, different in mobile ones and different for the print version of a website.

## Configuring the Content Provider

<info-box hint="">
  Since CKEditor 4.7 the content provider URL is set to empty by default. The former default URL is still available, although it is recommended to set up an account on the <a href="https://iframely.com/">Iframely</a> service for better control over embedded content.
</info-box>

The default CKEditor configuration up till version 4.7 was using an anonymized endpoint provided by Iframely, however, it did not include several features such as Google Maps. It is still possible to use it by setting the {@linkapi CKEDITOR.config.embed_provider CKEDITOR.config.embed_provider} in the following way:

	config.embed_provider = '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}'

However, for better control of API usage it is recommended to [set up an account at Iframely](https://iframely.com/plans). The free "Developer" tier does not have this restriction.

Iframely can also be configured to be hosted on your server &mdash; you can read more about it in the ["Self-host Iframely APIs"](https://iframely.com/docs/host) article.

At the same time both widgets can be easily {@linkapi CKEDITOR.config#embed_provider configured} to use another [oEmbed](http://www.oembed.com/) provider or custom services.

## Automatic Embedding on Paste

If the optional [Auto Embed](https://ckeditor.com/cke4/addon/autoembed) plugin is enabled, pasting the resource URL directly into the editing area will result in embedding it. By default this feature is configured to work with the Media Embed and Semantic Media Embed plugins.

If you wish to make it work with your custom media embed widget (see {@link guide/dev/features/embed/README#implementing-a-new-embed-widget Implementing a New Embed Widget}), just change the {@linkapi CKEDITOR.config#autoEmbed_widget } option to point to your widget, for example:

	config.autoEmbed_widget = 'customEmbed';

You can test auto embedding in the {@linksdk mediaembed Embedding Media Resources with oEmbed} sample.

## Implementing a New Embed Widget

Both plugins utilize the {@linkapi CKEDITOR.plugins.embedBase#createWidgetBaseDefinition Embed Base API} exposed by the [Embed Base](https://ckeditor.com/cke4/addon/embedbase) plugin which can be used to implement other types of widgets for embedding asynchronously retrieved content.

## Embedding Media Demo

See the {@linksdk mediaembed working "Embedding Media Resources with oEmbed" sample} that showcases the Media Embed and Auto Embed plugins.
