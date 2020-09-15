---
category: integration
order: 30
url: guide/dev_angular
menu-title: Angular Integration
meta-title-short: Angular Integration
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 WYSIWYG Editor Angular Integration

<info-box info="">
	This feature is provided through the <a href="https://www.npmjs.com/package/ckeditor4-angular"><code>ckeditor4-angular</code> npm package</a>.
</info-box>

CKEditor 4 offers a native Angular integration through the CKEditor 4 Angular component. It provides deep integration of CKEditor 4 and Angular that lets you use the native features of the WYSIWYG editor inside an Angular component. The CKEditor 4 Angular component is compatible with Angular versions 5.0 and later.

## Basic Usage

In order to create an editor instance in Angular, install the `ckeditor4-angular` npm package as a dependency of your project:

```bash
npm install ckeditor4-angular
```

After installing, import `CKEditorModule` to your application:

```typescript
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule( {
	imports: [
		...
		CKEditorModule,
		...
	],
	…
} )
```

You can now use the `<ckeditor>` tag in the component template to include the rich text editor:

```html
<ckeditor data="<p>Hello, world!</p>"></ckeditor>
```

The `data` attribute used in the example above is responsible for setting the editor's data.

## Customizing CKEditor Preset or Version

By default, the CKEditor 4 Angular component loads the [Standard-All preset](https://ckeditor.com/cke4/presets-all) of the latest CKEditor 4 release from the <a href="https://cdn.ckeditor.com/">CDN</a> when creating the first editor. This behavior can be altered by setting the value of the `editorUrl` attribute in the template to point to the desired CKEditor script location:

```html
<ckeditor editorUrl="https://your-website.example/ckeditor/ckeditor.js"></ckeditor>
```

Note that this attribute must be assigned **before the first component is initialized**.

Alternatively, you can load CKEditor before loading the CKEditor 4 Angular component. In this case the component will use the already loaded CKEditor:

```html
<script src="my-custom-build/ckeditor.js"></script>
<script src="your-app-bundle.js"></script>
```

## Choosing the Editor Type

By default, starting from stable `1.0.0` version, the CKEditor 4 Angular component creates a {@link guide/dev/framed/README classic editor}. To create an editor with a {@link features/uitypes/README#floating-user-interface floating UI}, change the `type` property to `inline`:

```html
<ckeditor
	data="<p>Some initial data</p>"
	type="inline"
></ckeditor>
```

Up to the integration version `1.3.0` there was also a separate `divarea` editor type - an {@link guide/dev/inline/README inline editor} with a {@link features/uitypes/README#fixed-ui-for-inline-editor fixed UI}. From the `2.0.0` it is still available, but instead of setting the editor type you just need to include a [Div Editing Area plugin](https://ckeditor.com/cke4/addon/divarea) in the editor config.

## Integration with ngModel

The component implements the [`ControlValueAccessor` interface](https://angular.io/api/forms/ControlValueAccessor) and works with `ngModel`.

To use it, first create a model in your component:

``` typescript
@Component( {
	...
} )
export class MyComponent {
	public model = {
		editorData: '<p>Hello, world!</p>'
	};
	...
}
```

Then you can use the model in the template to enable the two-way data binding.

```html
<ckeditor [(ngModel)]="model.editorData"></ckeditor>
```

## Supported `@Input` properties

The following `@Input` properties are supported by the CKEditor 4 Angular component:

### `editorUrl`

The URL address to `ckeditor.js`. Refer to [Customising CKEditor Preset or Version](#customizing-ckeditor-preset-or-version) for more information.

### `config`

Custom configuration can be passed to the editor with the `config` attribute passed to `<ckeditor>` in the component template. The following example shows {@link features/toolbar/README how to change the toolbar configuration}:

```html
<ckeditor
	data="<p>Editor' content</p>"
	[config]="{ toolbar: [ [ 'Bold' ] ] }"
></ckeditor>
```

All {@linkapi CKEDITOR.config configuration options} can be changed this way.

### `data`

The initial data of the WYSIWYG editor. It can be a static value:

```html
<ckeditor data="<p>Hello, world!</p>"></ckeditor>
```

or a shared parent component’s property:

```typescript
@Component( {
	...
} )
export class MyComponent {
	public editorData = '<p>Hello, world!</p>';
}
```

```html
<ckeditor [data]="editorData"></ckeditor>
```

### `tagName`

Specifies the tag name of the HTML element on which the WYSIWYG editor will be created.

The default tag is `<textarea>`.

``` html
<ckeditor tagName="textarea"></ckeditor>
```

### `readOnly`

The editor can be set to {@link features/readonly/README read-only mode} with the `readOnly` property:

```html
<ckeditor
	data="<p>Editor's content</p>"
	readOnly="true"
></ckeditor>
```

This property takes precedence over the {@linkapi CKEDITOR.config#readOnly `config.readOnly`} setting.

## Supported `@Output` properties

The following `@Output` properties are supported by the CKEditor 4 Angular component:

### `ready`

Fires when the editor is ready. It corresponds with the {@linkapi CKEDITOR.editor#instanceReady `editor#instanceReady`} event.

### `dataReady`

Fires when the editor data is loaded, for example after switching from WYSIWYG mode or using the {@linkapi CKEDITOR.editor#setData `editor#setData()`} method. It corresponds with the {@linkapi CKEDITOR.editor#dataReady `editor#dataReady`} event.

### `change`

Fires when the content of the editor has changed. It corresponds with the {@linkapi CKEDITOR.editor#change `editor#change`} event. For performance reasons this event may be called even when data has not really changed.

Please note that this event will only be fired when the [Undo](https://ckeditor.com/cke4/addon/undo) plugin is loaded. If you need to listen for editor changes (e.g. for two-way data binding), use the [`dataChange` event](#datachange) instead.

```html
<ckeditor (change)="onChange($event)"></ckeditor>
```

``` typescript

import { CKEditor4 } from 'ckeditor4-angular/ckeditor';

@Component( {
	...
} )
export class MyComponent {
	public onChange( event: CKEditor4.EventInfo ) {
		console.log( event.editor.getData() );
	}
	...
}
```

### `dataChange`

Fires when the content of the editor has changed. In contrast to `change`, it only emits when the data has really changed and thus it can be successfully used with `[data]` and two-way `[(data)]` binding.

### `focus`

Fires when the editor's editable is focused. It corresponds with the {@linkapi CKEDITOR.editor#focus `editor#focus`} event.

### `blur`

Fires when the editing area of the editor is blurred. It corresponds with the {@linkapi CKEDITOR.editor#blur `editor#blur`} event.

### `paste`

Fires when the user initiates a paste action, but before the data is inserted into the editor. It corresponds with the {@linkapi CKEDITOR.editor#paste `editor#paste`} event.

### `afterPaste`

Fires after the {@link guide/dev/integration/angular/README#paste `paste`} event if the editor content was modified by a paste action. It corresponds with the {@linkapi CKEDITOR.editor#afterPaste `editor#afterPaste`} event.

### `dragStart`

A facade for the native `dragstart` event. Fires when the native `dragstart` event occurs. It corresponds with the {@linkapi CKEDITOR.editor#dragstart `editor#dragstart`} event.

### `dragEnd`

A facade for the native `dragend` event. Fires when the native `dragend` event occurs. It corresponds with the {@linkapi CKEDITOR.editor#dragend `editor#dragend`} event.

### `drop`

A facade for the native `drop` event. Fires when the native `drop` event occurs. It corresponds with the {@linkapi CKEDITOR.editor#drop `editor#drop`} event.

### `fileUploadRequest`

Fires when the file loader should send an XHR request. If the event is not stopped or canceled, the default request will be sent. It corresponds with the {@linkapi CKEDITOR.editor#fileUploadRequest `editor#fileUploadRequest`} event.

### `fileUploadResponse`

Fires when the {@linkapi CKEDITOR.fileTools.fileLoader file upload} response is received and needs to be parsed. If the event is not stopped or canceled, the default response handler will be used. It corresponds with the {@linkapi CKEDITOR.editor#fileUploadResponse `editor#fileUploadResponse`} event.

### Note

Callbacks bound to each of the events are called with {@linkapi CKEDITOR.eventInfo `eventInfo`}. For importing and usage of the `EventInfo` interface see the [`change` example](#change).

## Editor Instance

In most cases there is no need to break the encapsulation provided by the CKEditor 4 Angular component as the WYSIWYG editor configuration and event handlers are configurable via the component's properties. However, if you need access to the {@linkapi CKEDITOR.editor} object, you can use the `instance` property of the component's instance:

```typescript
component.instance.getData();
```

Please note that this property is initialised asynchronously, when the component is ready.

## Types

CKEditor 4 types can be installed from [@types/ckeditor](https://www.npmjs.com/package/@types/ckeditor). Note that they are not maintained by the CKEditor team, so we cannot guarantee that they are up to date.

## CKEditor 4 Angular Integration Demo

See the {@linkexample angular working "CKEditor 4 Angular Integration" sample} that showcases the most important features of the integration, including switching the editor type, configuration and events, or setting up two-way data binding.
