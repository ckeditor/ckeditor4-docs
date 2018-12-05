---
category: user-interface
order: 20
url: guide/dev_uicolor
menu-title: UI Color
meta-title-short: UI Color
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Setting Editor User Interface Color

The editor UI color can be easily adjusted by the developer to match the look and feel of a website or an application where CKEditor is embedded in.

<info-box info=""> Please note that this feature can only be used for editor skins that are compatible with the so-called {@link guide/skin_sdk/chameleon/README "chameleon" feature}. The skins created by CKSource, i.e. <a href="https://ckeditor.com/cke4/addon/moono-lisa">Moono-Lisa</a>, <a href="https://ckeditor.com/cke4/addon/moono">Moono</a> and <a href="https://ckeditor.com/cke4/addon/kama">Kama</a>, already support it. If you are using a custom skin, you will need to define the {@linkapi CKEDITOR.skin#chameleon CKEDITOR.skin.chameleon} function in your <code>skin.js</code> file.
</info-box>

If you want to change the default UI color, you need to define the {@linkapi CKEDITOR.config.uiColor CKEDITOR.config.uiColor} configuration setting which accepts an RGB color code.

For example, to change the CKEditor UI to the joyful green color that would match this article's header, you could set the following {@link guide/dev/configuration/README editor configuration}:

```js
config.uiColor = '#66AB16';
```

This will cause the editor UI to assume the provided color, as visible below.

{@img assets/img/uicolor_01.png}

## User Interface Color Demo

The {@linksdk uicolor "Setting Editor UI Color" sample} shows how the editor user interface color can be changed by using the configuration option.

## Related Features

Read more about changing the UI color by using the color picker tool in the {@link guide/dev/features/uicolorpicker/README Using the UI Color Picker} article.
