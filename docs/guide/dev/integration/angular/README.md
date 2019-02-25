---
category: integration
order: 60
url: guide/dev_angular
menu-title: Angular Integration
meta-title-short: Angular Integration
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Angular Integration

<info-box info=""> This feature is provided through the <a href="https://www.npmjs.com/package/ckeditor4-angular"><code>ckeditor4-angular</code> npm package</a>.
</info-box>

CKEditor offers native Angular integration through `CKEditor` Angular component. It provides deep integration of CKEditor and Angular that lets you use the native features of CKEditor inside Angular component. The `CKEditor` Angular component is compatible with Angular versions 2.0 and later.

## Basic Usage

In order to create editor instance in Angular, install `ckeditor4-angular` npm package as a dependency of your project:

```bash
npm install --save ckeditor4-angular
```

After installing, import `CKEditorModule` to your application:

```typescript
import CKEditorModule from 'ckeditor4-angular';

@NgModule( {
	imports: [
		…
		CKEditorModule,
		…
	],
	…
} )
```

Now you can use `<ckeditor>` tag in component template to include the rich text editor:

```html
<ckeditor data="<p>Hello, world!</p>"></ckeditor>
```

The `data` attribute used in the above example is responsible for setting the editor's data.

## Customizing CKEditor Preset or Version

By default `CKEditor` Angular component loads [Standard Preset](https://ckeditor.com/docs/ckeditor4/latest/examples/standardpreset.html) of the latest CKEditor release from <a href="https://cdn.ckeditor.com/">CDN</a> while creating the first editor. This behavior can be altered by setting the value of `editorUrl` attribute in template to point to desired CKEditor location:

```html
<ckeditor [editorUrl]="https://your-website.example/ckeditor/ckeditor.js"></ckeditor>
```

Note that attribute must be assigned **before the first component is initialized**.

Alternatively you can load CKEditor before loading `CKEditor` Angular component. In that case the component will use the already loaded CKEditor:

```html
<script src="my-custom-build/ckeditor.js"></script>
<script src="your-app-bundle.js"></script>
```

## Choosing Editor Type

By default `CKEditor` Angular component creates {@link guide/dev/inline/README inline editor} with [Fixed User Interface](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_uitypes.html#fixed-ui-for-inline-editor), it will be referred as `divarea` editor. To create  with floating UI `type` property with value of `inline` must be added:

```html
<ckeditor
	data="<p>Some initial data</p>"
	type="inline"
></ckeditor>
```

Every other value of `type` property will be treated as `divarea`.

Notes:
- Due to some Angular limitations, `classic` editor is not yet supported.
- [divarea plugin](https://ckeditor.com/cke4/addon/divarea) must be included in your editor build, but there is no need to list it in [config.plugins](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-plugins) or [config.extraPlugins](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-extraPlugins).

## Integration with ngModel

The component implements the [`ControlValueAccessor` interface](https://angular.io/api/forms/ControlValueAccessor) and works with `ngModel`.

To use it, first create model in your component:

``` typescript
@Component( {
    …
} )
export class MyComponent {
    public model = {
        editorData: '<p>Hello, world!</p>'
    };
    …
}
```

Then you can use the model in the template to enable a two-way binding.

```html
<ckeditor [(ngModel)]="model.editorData"></ckeditor>
```

## Supported `@Input` properties

The following `@Input` properties are supported by CKEditor 4 Angular component:

### `editorUrl`

URL address to `ckeditor.js`, for more detailed information see [Customising CKEditor Preset or Version](#customizing-ckeditor-preset-or-version).

### `config`

Custom configuration can be passed to the editor via `config` attribute passed to `<ckeditor>` in component template. The following example shows {@link guide/dev/features/toolbar/README how to change the contents of the toolbar}:

```html
<ckeditor
	data="<p>Editor' content</p>"
	[config]="{ { toolbar: [ [ 'Bold' ] ] } }"
></ckeditor>
```

{@linkapi CKEDITOR.config All configuration} options can be changed this way.

### `data`

The initial data of the editor. It can be a static value:

```html
<ckeditor data="<p>Hello, world!</p>" …></ckeditor>
```

or a shared parent component’s property

```typescript
@Component( {
    …
} )
export class MyComponent {
    public editorData = '<p>Hello, world!</p>';
    …
}
```

```html
<ckeditor [data]="editorData" …></ckeditor>
```

### `tagName`

Specifies the tag name of the HTML element on which the editor will be created.

The default tag is `<textArea>`.
``` html
<ckeditor tagName="textarea" …></ckeditor>
```

### `readOnly`

Editor can be set to {@link guide/dev/features/readonly/README read-only mode} via `readOnly` property:

```html
<ckeditor
	data="<p>Editor's content</p>"
	readOnly="true"
><ckeditor>
```

This property takes precedence over {@linkapi CKEDITOR.config#readOnly `config.readOnly`} setting.

## Supported `@Output` properties

The following `@Output` properties are supported by CKEditor 4 Angular component:

### `ready`

Fires when the editor is ready. It corresponds with the `editor#instanceReady` https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-instanceReady event.

### `change`

Fires when the content of the editor has changed.

Corresponds with the `editor#change` https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-change event. For performance reasons this event may be called even when data didn't really changed.

```html
<ckeditor (change)="onChange($event)"></ckeditor>
```

``` typescript

import { CKEditor4 } from "@ckeditor/ckeditor4-angular/ckeditor";

@Component( {
    …
} )
export class MyComponent {
    public onChange( event: CKEditor4.EventInfo ) {
        console.log( event.editor.getData() );
    }
    …
}
```

### `dataChange`

Fires when the content of the editor has changed. In contrast to `change` - only emits when data really changed thus can be successfully used with `[data]` and two way `[(data)]` binding.

### `focus`

Fires when the editor's editable is focused. It corresponds with the [`editor#focus`](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-focus) event.

### `blur`

Fires when the editing view of the editor is blurred. It corresponds with the [`editor#blur`](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-blur) event.

### Note

Callbacks bound to each of events, are called with {@linkapi CKEDITOR.eventInfo `eventInfo`}. For importing and usage of `EventInfo` interface see [**`change`** example](#change).

## Editor Instance

In most cases there is no need to break the encapsulation provided by `CKEditor` Angular component as editor's configuration and events handlers are configurable via component's properties. However If you need access to the {@linkapi CKEDITOR.editor } object, you can use the `instance` property of the component's instance:

```typescript
component.instance.getData();
```

Please note that this property is initialised asynchronously, when component is ready.

## Types

CKEditor types can be installed from [@types/ckeditor](https://www.npmjs.com/package/@types/ckeditor). Note, they aren't maintained by the CKEditor Team, so we can't guarantee that are up to date.
