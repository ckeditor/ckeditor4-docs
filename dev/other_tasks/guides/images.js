/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

const path = require( 'path' );
const cheerio = require( 'cheerio' );

module.exports = ( content ) => {
	let newContent = content;
	const imagesDir = 'assets/img';
	const imagesBasePath = '%BASE_PATH%/assets/img';
	const regexp = /{@img\s+([^}\s]+)[^}]*}/g;

	newContent = newContent.replace( regexp, ( match, imagePath ) => {
		return match.replace( imagePath, path.join( imagesDir, imagePath ) );
	} );

	const $ = cheerio.load( newContent, {
		decodeEntities: false,
		xmlMode: true
	} );

	$( 'img' ).each( function() {
		const src = $( this ).attr( 'src' );

		if ( !src ) {
			return true;
		}

		if ( !src.startsWith( 'http://' ) && !src.startsWith( 'https://' ) && !src.includes( imagesDir ) ) {
			$( this ).attr( 'src', path.join( imagesBasePath, path.basename( src ) ) );
		}
	} );

	return $.html();
};
