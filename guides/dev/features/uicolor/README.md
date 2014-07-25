# Adjusting Editor User Interface Color

The editor UI color can be easily adjusted by the developer to match the look and feel of a website or an application where CKEditor is embedded in.

<p class="tip">
	Please note that this feature can only be used for editor skins that are compatible with the so-called <a href="#!/guide/skin_sdk_chameleon">"chameleon" feature</a>. The skins created by CKSource, i.e. <a href="http://ckeditor.com/addon/moono">Moono</a> and <a href="http://ckeditor.com/addon/kama">Kama</a>, already support it. If you are using a custom skin, you will need to define the <a href="#!/api/CKEDITOR.skin-method-chameleon">CKEDITOR.skin.chameleon</a> function in your <code>skin.js</code> file.
</p>

If you want to change the default UI color, you need to define the CKEDITOR.config.uiColor configuration setting which accepts an RGB color code.

For example, to change the CKEditor UI to the joyful green color that would match this article's header, you could set the following [editor configuration](#!/guide/dev_configuration):

	config.uiColor = #66AB16;

This will cause the editor UI to assume the provided color, as visible below.

{@img uicolor_01.png}

## User Interface Color Demo

The ["User Interface Color Adjustment" sample](http://sdk.ckeditor.com/samples/uicolor.html) shows how the editor UI color can be changed by using the configuration option.

## Related Features

Read more about changing the UI color by using the color picker tool in the [Using the UI Color Picker](#!/guide/dev_uicolorpicker) article.