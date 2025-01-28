/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Component } from '@angular/core';

@Component( {
	selector: 'app-editor-types',
	templateUrl: './editor-types.component.html'
} )
export class EditorTypesComponent {
	public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
	public editorConfig = {
		extraPlugins: 'sourcedialog'
	}
}
