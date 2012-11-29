# Plugin icon guidelines

CKEditor [addon repository](http://ckeditor.com/addons/plugins/all) is the best 
place for the community to share custom plugins. Launched with 
[CKEditor 4.0](http://ckeditor.com/blog/CKEditor-4-Launched-Inline-Editing-New-Skin-and-More),
it gathers all the plugins and makes them available for users to develop 
customized editor builds that satisfy most demanding needs.

Each plugin in the official repository can be assigned a short description and 
logo, which is a visual representation of the feature behind it. Icons are very 
important since they help people to find useful addons. In this guide, we'll look at basic 
principles of icon development that allow creating simple and good-looking icons 
for CKEditor plugins.

<p class="tip">
	Please note that the following guidelines are preferred but <strong>not mandatory</strong>.
	They have been establish to unify look and feel of core editor plugins.
	Feel free to make them even better when creating your icons!
</p>

## Background Colour Palette

The following background colour palette is to provide a diversity of colours
that go well with each other and create a good starting point for developing
new icons. There are many other similar, open-source colour palettes like 
[Tango](http://tango.freedesktop.org/Tango_Icon_Theme_Guidelines#Color_Palette)
or [Ubuntu](http://design.canonical.com/the-toolkit/ubuntu-brand-guidelines/)
that may be an inspiration for designers.

<ul class="colorPalette">
	<li style="background:#888a85">#888a85</li>
	<li style="background:#f75f4b">#f75f4b</li>
	<li style="background:#f57900">#f57900</li>
	<li style="background:#66bcc9">#66bcc9</li>
	<li style="background:#a6d10e">#a6d10e</li>
	<li style="background:#b992b5">#b992b5</li>
</ul>

## Sample Icon Structure

By default each plugin icon is **150x150px**. There are three basic aspects of 
icon development that need to be considered (see the image below):

![Basic guidelines](guides/plugin_sdk_icon_guidelines/guidelines.png)

1. **Background colour**. It is advised to use a solid colour of low lightness 
for better contrast (see [HSL model details](http://en.wikipedia.org/wiki/HSL_and_HSV)).
Background patterns like dots or stripes distort small images and viewers get distracted.

2. **Icon elements**. Icon should **capture the characteristics** of the plugin so 
it will be immediately recognizable. White, sharp elements, while on a 
dark background, improve readability. Make sure your shapes are as simple as 
possible, avoid unnecessary details. Usually you can avoid complex forms by creating metaphors.

3. **Minimal paddings** of 10% (**15px**) guarantee symmetry and prevent icon
contents from mixing with the webpage. Take care of colour balance; minimal paddings will 
help you avoid very bright, unbalanced images. Also make sure that shapes that you create
always fit into the padding box.

## Common Pitfalls and Mistakes

![Common mistakes](guides/plugin_sdk_icon_guidelines/mistakes.png)

1. Minimal padding rule violated.
2. Strong asymmetry; elements are too small.
3. Text in the icon, which duplicates the name of the plugin.
4. Very low contrast.
5. Too many elements which make icon hard to read.
6. Pattern in the background.

## Working Example

<p class="tip">
	You can <a href="guides/plugin_sdk_icon_guidelines/example.svg">download the
	SVG</a> file used in this tutorial. You can open it directly with 
	<a href="http://inkscape.org/">Inkscape</a>, a free, open-source scalable 
	vector graphic editor. If you prefer other format, you can also 
	<a href="guides/plugin_sdk_icon_guidelines/example.pdf">download a corresponding
	PDF</a> file.
</p>

The image below is a screenshot of a real workspace dedicated for comfortable
icon development. Make sure you use grids and guidelines while positioning
elements and creating pixel-perfect details.
[Vector graphics](http://en.wikipedia.org/wiki/Vector_graphics) is advised
for faster and more accurate development.

![Icon development example](guides/plugin_sdk_icon_guidelines/example.png)
