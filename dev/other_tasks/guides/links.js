/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

const path = require( 'path' );
const cheerio = require( 'cheerio' );

module.exports = ( content, guidesConfig ) => {
	let newContent = content;
	const regexp = /\[([^\]]+)\]\((#!\/[^\s)]+)\)/g;

	newContent = newContent.replace( regexp, ( match, linkText, href ) => {
		if ( href.startsWith( '#!/guide' ) ) {
			if ( href === '#!/guides' ) {
				return `{@link guide ${ linkText }}`;
			}

			href = href.replace( '-section-', '#' );

			const guideNamePre = path.basename( href );
			const hashIndex = guideNamePre.indexOf( '#' );
			const hashAndRest = hashIndex > 0 ? guideNamePre.substring( hashIndex ) : '';
			const guideName = hashIndex > 0 ? guideNamePre.substring( 0, hashIndex ) : guideNamePre;
			const targetGuideConfig = getGuideConfig( guideName, guidesConfig );

			if ( !targetGuideConfig ) {
				console.warn( `Couldnt find guideConfig for link ${ match }` );

				return match;
			}

			const newHref = path.join( 'guide', targetGuideConfig.url, 'README' );

			return `{@link ${ newHref }${ hashAndRest } ${ linkText }}`;
		} else if ( href.startsWith( '#!/api' ) ) {
			// TODO

			return match;
		} else {
			console.warn( 'Unexpected link.' );
		}
	} );

	return newContent;
};

function getGuideConfig( name, guidesData ) {
	for ( const item of guidesData ) {
		if ( item.name === name ) {
			return item;
		}

		let result;

		if ( item.items && item.items.length > 0 ) {
			result = getGuideConfig( name, item.items );
		}

		if ( result ) {
			return result;
		}
	}
}
