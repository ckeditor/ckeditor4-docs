<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Setting It Up to Start a Custom Skin

The starting point of developing a skin is choosing an existing skin to base your work on. Starting a skin from scratch is possible, but it is a lot of work. Actually, it is up to the skin developer to decide the road to take, but generally existing skins are good enough. We recommend the default [Moono skin](#!/guide/skin_sdk_intro-section-2) as the basis, because it is actively maintained and includes all possible features a skin can have.

You must have access to the "source files" of the selected skin. Distribution files are usually optimized for final use and are unreadable. Copy the source files in a folder inside the `skins` folder of a CKEditor installation. Give the folder name the name of your new skin (lower-cased, no spaces).

Now set the skin name in the CKEditor configuration file (`config.js`). For example:

	config.skin = 'myskin';

You are done, CKEditor will now start using your new skin files.
