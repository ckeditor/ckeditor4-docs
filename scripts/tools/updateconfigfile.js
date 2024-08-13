/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

const fs = require( 'fs-extra' );
const path = require( 'path' );
const template = require( 'string-placeholder' );

module.exports = ( { configFileSrc, configFileDst } ) => new Promise( ( resolve, reject ) => {
	Promise.all( [
			fs.readJson( configFileSrc ),
			fs.readFile( configFileDst ).then( data => data.toString() ),
			fs.readJson( path.join( process.cwd(), 'umberto.json' ) )
		] )
		.then( ( [ srcConfig, dstFile, config ] ) => {
			let insertedData = '\t// Common config injected by examples building script.\n';
			for ( const key in srcConfig ) {
				if ( !srcConfig.hasOwnProperty( key ) ) {
					continue;
				}

				if ( typeof srcConfig[ key ] === 'string' ) {
					insertedData += `\tconfig.${ key } = '${ template( srcConfig[ key ], config.variables, { before: '{%', after: '%}' } ) }';\n`;
				}

				if ( typeof srcConfig[ key ] === 'number' ) {
					insertedData += `\tconfig.${ key } = ${ srcConfig[ key ] };\n`;
				}
			}
			insertedData += '\t// End of injected config.\n';
			return dstFile.replace( /function\( config \) \{\n/, 'function( config ) {\n' + insertedData );
		} )
		.then( data => fs.writeFile( configFileDst, data, 'utf8' ) )
		.then( () => {
			resolve();
		} )
		.catch( err => reject( err ) );
} );
