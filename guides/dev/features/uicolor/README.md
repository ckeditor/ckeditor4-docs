# Adjusting Editor User Interface Color

<p class="requirements">
	Some features described in this article are provided through an optional plugin that may not be included in the CKEditor preset available from the <a href="http://ckeditor.com/download">Download</a> site that you are using and may <a href="#!/guide/dev_plugins">need to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

The editor UI color can be easily adjusted by the developer to match the look and feel of a website or an application where CKEditor is embedded in.

<p class="tip">
	Please note that this feature can only be used for editor skins that are compatible with the so-called <a href="#!/guide/skin_sdk_chameleon">"chameleon" feature</a>. The skins created by CKSource, i.e. <a href="http://ckeditor.com/addon/moono">Moono</a> and <a href="http://ckeditor.com/addon/kama">Kama</a>, already support it. If you are using a custom skin, you will need to define the <code><a href="#!/api/CKEDITOR.skin-method-chameleon">CKEDITOR.skin.chameleon</a></code> function in your <code>skin.js</code> file.
</p>

If you want to change the default UI color, you need to define the CKEDITOR.config.uiColor configuration setting. This option accepts an RGB color code or one of the 140 color names as defined in the HTML and CSS color specification.

For example, to change the CKEditor UI to the joyful green color that would match this site's header, you could set the following [editor configuration](#!/guide/dev_configuration):

	config.uiColor = #66AB16;

This will cause the editor UI to assume the provided color, as visible below.

{@img uicolor_01.png}

## UI Color Picker

Adjusting the UI color can be even easier than that. To make use of the second method, your CKEditor build needs to include the optional [UI Color Picker](http://ckeditor.com/addon/uicolor) plugin.

When the plugin is enabled, it adds a new **UI Color Picker** button (<img src="guides/dev_uicolor/uicolor.png">) to your toolbar. Clicking this button opens the **UI Color Picker** dialog window where you have a few options to find the right color.

{@img uicolor_02.png}

For a start, you can click anywhere in the color palette to select a color. You can also choose from one of the pre-defined color sets and fine-tune as you see fit. Last but not least you can simply manually enter an RGB color code or the RGB and HSV values in appropriate fields.

A nice feature of this tool is that it offers instant preview of the selected color, so testing your changes is really quick.

When you are satisfied with your choice, you can copy the working UI color configuration code displayed at the bottom of the dialog window and use it in your editor configuration as described above.

{@img uicolor_03.png}

Although this feature is mainly useful for developers who are working on their CKEditor customizations, if you leave it enabled in your production environment, your end-users will be able to adjust the editor interface color to their liking. This change will only last until the end of their visit, though, and on reloading the page they will be greeted with default editor colors again.

## User Interface Color Demos 

The ["User Interface Color Adjustment" sample](http://sdk.ckeditor.com/samples/uicolor.html) shows how the editor UI color can be changed by using the configuration option.

The ["UI Color Picker" sample](http://sdk.ckeditor.com/samples/uicolorpicker.html) showcases the color picker tool that can be used to adjust the user interface color.
