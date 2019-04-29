/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Component } from '@angular/core';

@Component( {
	selector: 'app-editor-types',
	templateUrl: './editor-types.component.html'
} )
export class EditorTypesComponent {
	public isReadOnly = false;
	public editorData =
		`<p>This is a CKEditor 4 instance created with Angular.</p>`;

	public inline = false;

	public componentEvents: string[] = [];

	changeEditorType() {
		this.inline = !this.inline;
	}
}
