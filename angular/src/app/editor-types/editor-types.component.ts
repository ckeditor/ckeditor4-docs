/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Component } from '@angular/core';

@Component( {
	selector: 'app-editor-types',
	templateUrl: './editor-types.component.html',
	styleUrls: [ './editor-types.component.css' ]
} )
export class EditorTypesComponent {
	public isReadOnly = false;
	public editorData =
		`<p>Hello world!</p>`;

	inline = false;

	public componentEvents: string[] = [];

	changeEditorType() {
		this.inline = !this.inline;
	}
}
