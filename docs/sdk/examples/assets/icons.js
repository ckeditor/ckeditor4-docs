/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

// Helper script for the sample pages inserting the toolbar button image into sample text.
// This file can be ignored and is not required to use CKEditor.

( function() {
	CKEDITOR.on( 'instanceReady', function( ev ) {
		// Set icons.
		var doc = new CKEDITOR.dom.document( document ),
			icons = doc.find( '.button_icon' );

		for ( var i = 0; i < icons.count(); i++ ) {
			var icon = icons.getItem( i ),
				name = icon.getAttribute( 'data-icon' ),
				style = CKEDITOR.skin.getIconStyle( name, ( CKEDITOR.lang.dir == 'rtl' ) );

			icon.addClass( 'cke_button_icon' );
			icon.addClass( 'cke_button__' + name + '_icon' );
			icon.setAttribute( 'style', style );
			icon.setStyle( 'float', 'none' );

		}
	} );
} )();
