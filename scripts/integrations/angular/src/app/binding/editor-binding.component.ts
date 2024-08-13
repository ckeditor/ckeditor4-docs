/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
	Component,
	ViewChild,
	AfterViewInit
} from '@angular/core';

@Component( {
	selector: 'app-binding',
	templateUrl: './editor-binding.component.html'
} )
export class EditorBindingComponent implements AfterViewInit {
	@ViewChild( 'editor' ) editor;

	public editorData = '<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>'

	public isSourceActive: boolean;

	public sourceData: string;

	ngAfterViewInit() {
		this.editor.dataChange.subscribe( ( value ) => {
			if ( !this.isSourceActive ) {
				this.sourceData = value;
			}
		} );
	}
}
