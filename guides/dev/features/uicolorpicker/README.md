# Using the UI Color Picker

<div class="requirements">
<p>
	Features described in this article are provided through an optional plugin that is not included in the CKEditor presets available from the <a href="http://ckeditor.com/download">Download</a> site and <a href="#!/guide/dev_plugins">needs to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>
<p>
	Please note that this feature can only be used for editor skins that are compatible with the so-called <a href="#!/guide/skin_sdk_chameleon">"chameleon" feature</a>. The skins created by CKSource, i.e. <a href="http://ckeditor.com/addon/moono">Moono</a> and <a href="http://ckeditor.com/addon/kama">Kama</a>, already support it. If you are using a custom skin, you will need to define the <a href="#!/api/CKEDITOR.skin-method-chameleon">CKEDITOR.skin.chameleon</a> function in your <code>skin.js</code> file.
</p>
</div>

[CKEditor UI color can be set manually](#!/guide/dev_uicolor) in the editor configuration, but adjusting the UI color can be even easier than that. To make use of the second method, your CKEditor build needs to include the optional [UI Color Picker](http://ckeditor.com/addon/uicolor) plugin.

When the plugin is enabled, it adds a new **UI Color Picker** button (<img src="guides/dev_uicolorpicker/uicolor.png">) to your toolbar. Clicking this button opens the **UI Color Picker** dialog window where you have a few options to find the right color.

{@img uicolor_02.png}

For a start, you can click anywhere in the color palette to select a color. You can also choose from one of the pre-defined color sets and fine-tune as you see fit. Last but not least you can simply manually enter an RGB color code or the RGB and HSV values in appropriate fields.

A nice feature of this tool is that it offers instant preview of the selected color, so testing your changes is really quick.

When you are satisfied with your choice, you can copy the working UI color configuration code displayed at the bottom of the dialog window and use it in your editor configuration as described above.

{@img uicolor_03.png}

Although this feature is mainly useful for developers who are working on their CKEditor customizations, if you leave it enabled in your production environment, your end-users will be able to adjust the editor interface color to their liking. This change will only last until the end of their visit, though, and on reloading the page they will be greeted with default editor colors again.

## UI Color Picker Demo 

See the [working "UI Color Picker" sample](http://sdk.ckeditor.com/samples/uicolorpicker.html) that showcases how easy it can be to set the editor UI color with the color picker tool. 

## Related Features

Read more about setting the default UI color by using a configuration option in the [Adjusting Editor User Interface Color](#!/guide/dev_uicolor) article.