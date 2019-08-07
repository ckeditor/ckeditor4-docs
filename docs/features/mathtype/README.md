---
category: inserting-content
order: 160
url: features/mathtype
menu-title: Mathematical and Chemical Formulas
meta-title-short: Mathematical Formulas
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Creating Mathematical and Chemical Formulas

<info-box info="">
 This feature is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/widget_installation/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The optional [Mathematical Formulas](https://ckeditor.com/cke4/addon/ckeditorwiris) plugin allows you to create and modify mathematical equations and chemical formulas created in MathML directly in CKEditor. TeX content will be automatically replaced by an image representing created equation or formula.

New equations can also be inserted into the editor content by using the **Insert a math equation - MathType** toolbar button and entering equation in the plugin dialog window. After you click the **OK** button, a mathematical formulas image will be inserted into the editor content.

{@img assets/img/mathtype_01.png}

New chemical formulas can be inserted by using the **Insert a chemistry formula – ChemType** toolbar button and entering formula in the plugin dialog window. After you click the **OK** button, a chemical formulas image will be inserted into the editor content.

{@img assets/img/mathtype_02.png}

Equations and chemical formulas are inserted as images, so they have {@link guide/dev/deep_dive/widgets/README#common-usage-scenarios all advantages of widgets}, i.e. you can **treat the entire equation as one entity** and select, delete, or move it with drag and drop in the editor content area as one unit.

## Displaying on Target Page

In order to display mathematical formulas on a target page, i.e. the page where content produced by CKEditor will be visible, the target page needs to [include the MathType script](https://docs.wiris.com/en/mathtype/mathtype_web/integrations/mathml-mode#add_a_script_to_head). For example for the default setting this would be:

``` html
<script src="<path-to-your-ckeditor4>/plugins/ckeditor_wiris/integration/WIRISplugins.js?viewer=image"></script>
```

## Mathematical Formulas Demo

See the {@linksdk mathtype working "Creating Mathematical and Chemical Formulas" sample} that showcases for the plugin.
