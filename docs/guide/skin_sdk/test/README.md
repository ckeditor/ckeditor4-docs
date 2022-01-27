---
category: creating-a-custom-skin
order: 60
url: guide/skin_sdk_test
menu-title: Test and Shape It Up
meta-title-short: Test and Shape It Up
---
<!--
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Testing and Shaping It Up

Once you have your skin working in the way you want in one browser, it is time to test it on others. For that, just open a CKEditor 4 sample with your skin on other browsers. Check out the CKSource {@link guide/dev/browsers/README GBS} for the list of browsers supported by CKEditor 4.

Other things to test among all browsers are:

* Add `config.language = 'he';` to the CKEditor 4 `config.js` file to load the editor in Hebrew and see the editor in RTL.
* Enable High Contrast on Windows (`SHIFT+ALT+PRINT-SCREEN`) and reload the page.
* Play with the UI Color sample to check the chameleon feature.
