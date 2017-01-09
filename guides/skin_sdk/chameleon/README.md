<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# The "Chameleon" Feature

One nice feature of CKEditor is its flexibility to easily match a website color scheme by simply setting the CKEDITOR.config.uiColor configuration option. While the Barbie site would set it to
<code style="background:#F59FC6">#F59FC6</code>, Ninja Turtles would prefer <code style="background:#B1CC3D">#B1CC3D</code>.

The core editor API controls the input of the preferred color, but it is the skin job to tell it how to change the color. This is because the skin itself defines where and how to use colors.

For that purpose, the CKEDITOR.skin.chameleon function must be defined in the `skin.js` file. Please check the [Moono skin](#!/guide/skin_sdk_intro-section-2) files for full details.

Note that adopting this feature is totally optional. A skin developer may decide to have a fixed color and not give the skin users any possibility to change it. This approach is not recommended, but if it is used, it is enough to set the CKEDITOR.skin.chameleon property to `null` in the `skin.js` file:

	CKEDITOR.skin.chameleon = null;

Or, for compatibility with older versions of CKEditor (prior to 4.4.7), set it to a function that returns an empty string:

	CKEDITOR.skin.chameleon = function() {
		return '';
	};
