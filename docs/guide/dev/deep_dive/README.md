---
category: ckeditor-deep-dive
order: 20
url: guide/dev_deep_dive
menu-title: Introduction
meta-title-short: Introduction
---
<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor Deep Dive

This section presents some more advanced CKEditor concepts. It is meant for all developers who have at least some experience working with the editor, want to understand its internal mechanisms, and create their own advanced customizations.

See these topics if you want to bring your CKEditor knowledge to a whole new level:

1. **Advanced Content Filter (ACF)** &ndash; Content filtering system that limits and adapts input data so it matches the editor configuration. It may also deactivate features which generate HTML code that is not allowed by the configuration.

	* {@link guide/dev/deep_dive/advanced_content_filter/README Introduction} &ndash; General information about the content filtering system implemented in CKEditor.
	* {@link guide/dev/deep_dive/advanced_content_filter/allowed_content_rules/README Allowed Content Rules} &ndash; Explanation of syntax that defines which HTML elements, attributes, styles, and classes are allowed in CKEditor.
	* {@link guide/dev/deep_dive/advanced_content_filter/disallowed_content/README Disallowed Content} &ndash; Explanation of how blacklisting works in ACF.

2. **{@link guide/dev/deep_dive/unsupported_environments/README Enabling CKEditor in Unsupported Environments (CKEditor &lt;4.4.8)}** &ndash; Experimental feature that lets you display CKEditor on devices and setups that are not {@link guide/dev/browsers/README officially supported}. Since version 4.5 CKEditor will display even in environments which are not yet supported what makes this guide obsolete.

3. **{@link guide/dev/deep_dive/widgets/README Widgets}** &ndash; Innovative CKEditor feature that lets you create rich content entities grouping multiple HTML elements.

4. **{@link guide/dev/deep_dive/clipboard/README Clipboard Integration}** &ndash; A thorough explanation of how CKEditor integration with clipboard works under the hood.

5. **{@link guide/dev/deep_dive/errors/README Error Code Reference}** &ndash; Explanation of CKEditor error codes that are logged to the JavaScript console.
