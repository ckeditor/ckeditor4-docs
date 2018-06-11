---
category: toolbar
order: 90
url: guide/dev_splitbutton
menu-title: Split Button
meta-title-short: Split Button
---

<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Split Button

<info-box info="">
    This feature was introduced in CKEditor 4.10. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The Splitbutton is an UI component which is composed from two elements. One of them is regular button which is called a `face`. Second is button with only arrow which will be referred as an `arrow`, which opens a dropdown menu.

## Configuration

The Splitbutton has plenty of configuration options, see example.

```javascript
editor.ui.add( `Splitbutton name`, CKEDITOR.UI_SPLITBUTTON, {
    face: {...},    // optional face definition
    onMenu: onMenuCallback, // optional callback
    label: `label for Splitbutton`,
    items: [...]    // listed definition of menu items
} );
```

- `face` an optional definition for static face.
- `onMenu` an optional callback to be executed whenever menu from the `arrow` button is opened.
- `label` to be set as Splitbuttons HTML element label.
- `items` an array which lists all of Splitbutton menu items.

### Static face

When the `face` definition is preset Splitbuttons face will be static, which means it will have same command and icon all the time.
Example:

```javascript
    face: {
        label: 'Bold',
        command: 'bold',    // optional command
        click: clickCallback,   // optional callback
        icon: 'Bold'
    },
```

Properties `command` and `click` are optional, but one of them should be preset.

It works in the same way as {@linkapi CKEDITOR.ui.button button} definition.

### Dynamic face

When the `face` definition is absent Splitbuttons face will dynamically change. It will represent menu item which has last active command, or default one if none is found.

### Items

`items` definitions will be used for rendering menu items, but when face is dynamic they will be used for `face` button.

```javascript
    items: [ {
        label: 'Underline',
        command: 'underline',   // optional command
        onClick: onClickCallback,   // optional callback
        icon: 'Underline',
        default: true // optional
    },
    {...}
    ]
```

Properties `command` and `onClick` are optional, but one of them should be present.
Property `default` will set one of the items as default which means it will be also the `face` whenever none of items is active.

Items definition works in same way as {@linkapi CKEDITOR.ui.menubutton menubutton}.

## Adding to UI

The Splitbutton can be added to editors toolbar, you can do it in two ways.

1. Push it to an existing toolgroup by `toolbar` property in the Splitbuttons definition, see {@link CKEDITOR.ui#addButton addButton}, for example:

```javascript
    editor.ui.add( 'JustifySplit', CKEDITOR.UI_SPLITBUTTON, {
        items: [...],
        label: '...',
        toolbar: 'align, 10'
        // Split Button will be added to toolbar named 'align' at position 10.
    }
```

2. Define the toolbar in editors config, see {@linkapi CKEDITOR.config#toolbar toolbar}. for example:
```javascript
    // Once we defined Split Button via editor.ui.add
    var config = {
        toolbar: [
            [ 'Source', 'Undo', 'Redo' ],
            [ 'Bold', 'Italic', 'Underline', 'JustifySplit' ]
            // Split Button will be added to secont toolbar at the last position.
        ]
    }
```

It can be also added to the Balloon toolbar, see {@linkapi CKEDITOR.ui.balloonToolbar#addItems addItems}.

## Splitbutton sample

See the [Splitbutton sample](https://sdk.ckeditor.com/samples/splitbutton.html) how the Splitbutton can save UI space and bring features to CKEditor UI in new ways.
