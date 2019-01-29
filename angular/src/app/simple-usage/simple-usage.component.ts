/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Component } from '@angular/core';

@Component( {
	selector: 'app-simple-usage',
	templateUrl: './simple-usage.component.html',
	styleUrls: [ './simple-usage.component.css' ]
} )
export class SimpleUsageComponent {
	public isReadOnly = false;
	public editorData =
		`<p>Getting used to an entirely different culture can be challenging.
While it’s also nice to learn about cultures online or from books, nothing comes close to experiencing cultural diversity in person.
You learn to appreciate each and every single one of the differences while you become more culturally fluid.</p>`;

	isHidden = false;

	isRemoved = false;

	inline = false;

	public componentEvents: string[] = [];

	toggleDisableEditors() {
		this.isReadOnly = !this.isReadOnly;
	}

	changeEditorType() {
		this.inline = !this.inline;
	}

	onReady( editor: any, EditorName: string ): void {
		console.log( `${EditorName} editor is ready.` );
	}

	onChange( event: any, EditorName: string ): void {
		console.log( `${EditorName} editor model changed.` );
	}

	onFocus( event: any, EditorName: string ): void {
		console.log( `Focused ${EditorName.toLowerCase()} editing view.` );
	}

	onBlur( event: any, EditorName: string ): void {
		console.log( `Blurred ${EditorName.toLowerCase()} editing view.` );
	}
}
