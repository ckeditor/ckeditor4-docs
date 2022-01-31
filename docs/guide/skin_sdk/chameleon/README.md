---
category: advanced-concepts
order: 60
url: guide/skin_sdk_chameleon
menu-title: Chameleon Feature
meta-title-short: Chameleon Feature
---
<!--
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# The "Chameleon" Feature

One nice feature of CKEditor 4 is its flexibility to easily match a website color scheme by simply setting the {@linkapi CKEDITOR.config.uiColor CKEDITOR.config.uiColor} configuration option. While the Barbie site would set it to <code style="background:#F59FC6">#F59FC6</code>, Ninja Turtles would prefer <code style="background:#B1CC3D">#B1CC3D</code>.

The core editor API controls the input of the preferred color, but it is the skin job to tell it how to change the color. This is because the skin itself defines where and how to use colors.

For that purpose, the {@linkapi CKEDITOR.skin.chameleon CKEDITOR.skin.chameleon} function must be defined in the `skin.js` file. Please check the {@link guide/skin_sdk/intro/README#the-moono-skin Moono skin} files for full details.

Note that adopting this feature is totally optional. A skin developer may decide to have a fixed color and not give the skin users any possibility to change it. This approach is not recommended, but if it is used, it is enough to set the {@linkapi CKEDITOR.skin.chameleon CKEDITOR.skin.chameleon} property to `null` in the `skin.js` file:

	CKEDITOR.skin.chameleon = null;

Or, for compatibility with older versions of CKEditor 4 (prior to 4.4.7), set it to a function that returns an empty string:

	CKEDITOR.skin.chameleon = function() {
		return '';
	};
