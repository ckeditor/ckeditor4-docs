---
category: creating-a-custom-skin
order: 20
url: guide/skin_sdk_setup
menu-title: Setup
meta-title-short: Setup
---
<!--
Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Setting It Up to Start a Custom Skin

The starting point of developing a skin is choosing an existing skin to base your work on. Starting a skin from scratch is possible, but it is a lot of work. Actually, it is up to the skin developer to decide the road to take, but generally existing skins are good enough. We recommend the default {@link guide/skin_sdk/intro/README#the-moono-lisa-skin Moono-Lisa skin} as the basis, because it is actively maintained and includes all possible features a skin can have.

You must have access to the "source files" of the selected skin. Distribution files are usually optimized for final use and are unreadable. Copy the source files in a folder inside the `skins` folder of a CKEditor 4 installation. Give the folder name the name of your new skin (lower-cased, no spaces).

Now set the skin name in the CKEditor 4 configuration file (`config.js`). For example:

	config.skin = 'myskin';

You are done, CKEditor 4 will now start using your new skin files.
