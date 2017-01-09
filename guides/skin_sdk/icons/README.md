<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Icons

An important aspect that a skin can (optionally) customize are the icons used on the CKEditor toolbar and context menu. This is not mandatory in any way, but it makes it possible to precisely align the icons design with the skin lines.

The CKEditor toolbar is filled by buttons provided by plugins. These plugins include default icons for their buttons. The skin role here is eventually overriding those icons, by providing a different version of them. This means that, if a skin icon is available for a button, it will be used, otherwise the default plugin icon is used.

There is a huge number of plugins available for CKEditor, provided by people and companies all around the world. It is impossible for a skin developer to provide icons for every single plugin, so it is up to her to decide which icons to include.

All skin icons must be included inside the `icons` folder in the skin folder. The icons file name must match the name of the icon files available in the `icons` folder of the plugins.

If you want the source version of your skin to overload icons properly, you must inform CKEditor about the presence of your custom icons. This is optional, but if not done your icons will be visible in the release version of your skin only. Check the `skin.js` file in the [Moono skin](#!/guide/skin_sdk_intro-section-2) for an example.
