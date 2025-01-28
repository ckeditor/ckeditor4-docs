/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Component } from '@angular/core';

interface ComponentEvent {
	name: string;
	timestamp: string;
}

@Component( {
	selector: 'app-events',
	templateUrl: './events.component.html'
} )
export class EventsComponent {
	public events: ComponentEvent[] = [];

	public editorConfig = {
		toolbar: [
			[ 'Source' ],
			[ 'Styles', 'Format', 'Font', 'FontSize' ],
			[ 'Bold', 'Italic' ],
			[ 'Undo', 'Redo' ],
			[ 'EasyImageUpload' ],
			[ 'About' ]
		],
		extraPlugins: 'easyimage',
		removePlugins: 'image',
		cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
		cloudServices_tokenUrl:
			'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
	}

	clearEventsLog(): void {
		this.events.length = 0;
	}

	onReady(): void {
		this.logEvent( 'ready' );
	}

	onChange(): void {
		this.logEvent( 'change' );
	}

	onFocus(): void {
		this.logEvent( 'focus' );
	}

	onBlur(): void {
		this.logEvent( 'blur' );
	}

	private logEvent( eventName: string ): void {
		if ( this.events.length > 19 ) {
			this.events.pop();
		}

		const eventData = {
			name: eventName,
			timestamp: this.getCurrentTimestamp()
		}

		this.events.unshift( eventData );

		console.log( eventData.timestamp, eventData.name, event );
	}

	private getCurrentTimestamp() {
		return new Intl.DateTimeFormat( 'en', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		} ).format( new Date() );
	}
}
