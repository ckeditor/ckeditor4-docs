/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
	Component,
	ViewChild,
	AfterViewInit,
	ElementRef
} from '@angular/core';

import { NgForm } from '@angular/forms';

@Component( {
	selector: 'app-demo-form',
	templateUrl: './demo-form.component.html'
} )
export class DemoFormComponent implements AfterViewInit {
	@ViewChild( 'demoForm' ) demoForm?: NgForm;
	@ViewChild( 'preview' ) preview: ElementRef;
	@ViewChild( 'editor' ) editor;

	public model = {
		name: 'John',
		surname: 'Doe',
		description: '<p>This is a sample form using CKEditor 4 and created in Angular.</p>'
	};

	public isPreviewActive: boolean;

	public previewModel: string;

	onSubmit() {
		alert( `Form submit, model: ${ JSON.stringify( this.model ) }` );
	}

	reset() {
		this.demoForm!.reset();
	}

	get description() {
		return this.demoForm!.controls.description;
	}

	ngAfterViewInit() {
		this.editor.dataChange.subscribe( ( value ) => {
			if ( !this.isPreviewActive ) {
				this.previewModel = value;
			}
		} );
	}
}
