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
	templateUrl: './demo-form.component.html',
	styleUrls: [ './demo-form.component.css' ]
} )
export class DemoFormComponent implements AfterViewInit {
	@ViewChild( 'demoForm' ) demoForm?: NgForm;
	@ViewChild( 'preview' ) preview: ElementRef;
	@ViewChild( 'editor' ) editor;

	public model = {
		name: 'John',
		surname: 'Doe',
		description: '<p>Hello world!</p>'
	};

	public isPreviewActive: boolean;

	public previewModel: string;

	public formDataPreview?: string;

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
