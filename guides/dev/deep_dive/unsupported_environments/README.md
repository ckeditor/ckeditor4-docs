<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Enabling CKEditor in Unsupported Environments (CKEditor &lt;4.4.8)

By default, CKEditor **4.0 - 4.4.8** is disabled in all unsupported environments through the CKEDITOR.env.isCompatible flag. The list of officially supported environments is [available here](#!/guide/dev_browsers-section-officially-supported-browsers).

## Why Is CKEditor Disabled in Some Environments?

<p class="tip">Since version 4.5 CKEditor is only disabled in environments that are known to be incompatible. Therefore, <strong>this guide applies mostly to versions &lt;4.4.8</strong> where CKEditor was disabled in environments which were not explicitly whitelisted.</p>

There are usually two main reasons for that:

* Some crucial editor features will not work in a particular environment &mdash; this mostly pertains to older browser versions (like Internet Explorer 6 or 7, Firefox 3.6 and others), for whom support was dropped some time in the past.
* CKEditor has never been properly tested in a given environment &mdash; for example in Firefox OS.

While in the first case we know that CKEditor will simply **not work**, in the second case it actually may work pretty well, even though we were unable to verify it yet. The CKEDITOR.env.isCompatible flag is, however, only set to `true` when we are sure that CKEditor will work in a given scenario.

## Can CKEditor Be Enabled in Unsupported Environments?

We strongly advise against enabling CKEditor in older and unsupported browser versions. No bugs detected in these environments will ever be fixed either.

If you, however, would like to check how CKEditor works in some untested environments, the CKEditor API contains a solution that makes it possible.

<p class="tip">
	Enabling CKEditor in unsupported environments can only be done at your own risk. It is not recommended to attempt it on production environments without a prior testing phase.
</p>

## Changing the `env.isCompatible` Flag

By default, in CKEditor &lt;4.4.8 the CKEDITOR.env.isCompatible flag was set to `true` when a supported environment is detected. When you, however, manually set it to `true` in your configuration, CKEditor would be enabled in all environments, including the unsupported ones.

In CKEditor 4.5 and beyond, the CKEDITOR.env.isCompatible flag is set to `true` for all environments except the explicitly blacklisted ones.

This flag is checked only in functions creating an editor instance, like CKEDITOR.replace, CKEDITOR.inline, or CKEDITOR.appendTo. This means that the flag can be modified before creating an editor instance, but after the `<script>` tag that adds the CKEditor script to the page. For example:

	<script src="ckeditor/ckeditor.js"></script>
	<script>
		CKEDITOR.env.isCompatible = true;
	</script>
	...

Or even later, when creating an instance:

	<textarea id="editor1" ...></textarea>
	<script>
		CKEDITOR.env.isCompatible = true;
		CKEDITOR.replace( 'editor1' );
	</script>

## Blacklisting Some Unsupported Environments

Changing the CKEDITOR.env.isCompatible flag to `true` with no fine-tuning has one major drawback: it enables CKEditor in all environments, including those where the editor no longer works, like in older Internet Explorer versions. It is thus wise to safeguard against such cases by blacklisting Internet Explorer 7 and below.

	// Enable CKEditor in all environments except IE7 and below.
	if ( !CKEDITOR.env.ie || CKEDITOR.env.version > 7 )
		CKEDITOR.env.isCompatible = true;

This will enable CKEditor in experimental environments, including all mobile ones, but will disable it in Internet Explorer 7 and below. See the CKEDITOR.env API for more options if you want to fine-tune your setting.

Last but not least, to make sure that this code does not throw errors if the CKEditor script was not included on the page, you should check whether the [CKEDITOR](#!/api/CKEDITOR) object is available:

	if ( window.CKEDITOR && ( !CKEDITOR.env.ie || CKEDITOR.env.version > 7 ) )
		CKEDITOR.env.isCompatible = true;

## Editing the env.isCompatible Flag in Source

Although this is not a recommended approach, it is also possible to edit the CKEDITOR.env.isCompatible flag directly in CKEditor source. Depending on whether you use a development version of CKEditor or a production-ready compressed build (an official distribution or a custom build created with CKBuilder), you can find the flag in:

* The `ckeditor.js` file in a compressed build.
* The `core/env.js` file in a development build.

<p class="tip">
	Editing the CKEDITOR.env.isCompatible flag per page is a better approach that gives you more control over when and where you use it.
</p>

## Help Us by Reporting Issues!

Enabling CKEditor in unsupported environments is an experimental feature aimed at developers who are willing to help us bring official support to a wider range of devices and setups. We would thus appreciate if you [reported any issues](#!/guide/dev_issues_tracker) that you find on our [GitHub issues page](https://github.com/ckeditor/ckeditor-dev/issues). Do remember to describe the tested environment (operating system, browser, device) in as much detail as possible.

If you are particularly interested in using CKEditor on mobile devices, you can check the results of our [recent study](http://dev.ckeditor.com/ticket/11712#comment:5) on the state of CKEditor support in iOS and Android.
