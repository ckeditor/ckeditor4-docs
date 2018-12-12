/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

const fs = require( 'fs-extra' );
const path = require( 'path' );

module.exports = ( { configFileSrc, configFileDst } ) => new Promise( ( resolve, reject ) => {
	Promise.all( [ fs.readJson( configFileSrc ), fs.readFile( configFileDst ).then( data => data.toString() ), fs.readJson( path.join( process.cwd(), 'umberto.json' ) ) ] )
		.then( ( [ srcConfig, dstFile, config ] ) => {
			let insertedData = '\t// Common config injected by examples building script.\n';
			for ( const key in srcConfig ) {
				if ( srcConfig.hasOwnProperty( key ) && typeof srcConfig[ key ] === 'string' ) {
					insertedData += `\tconfig.${ key } = '${ replacePlaceholders( srcConfig[ key ], config.variables ) }';\n`;
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

function replacePlaceholders( inputString, variables ) {
	const macros = new Set( inputString.match( /\{%\s?[A-Z_]+?\s?%\}/g ) );
	let outputText = inputString;
	if ( !macros.size ) {
		return inputString;
	}
	if ( !variables ) {
		throw new Error( `Variables are not defined in umberto config, however there was detected macro usage in customconfig.js` );
	}
	macros.forEach( macro => {
		const name = macro.match( /\{%\s?([A-Z_]+)\s?%\}/ )[ 1 ]
		if ( variables[ name ] === undefined ) {
			throw new Error( `Macro "${ macro }" used in customconfig.js doesn't have corresponding variable in configuration.` );
		}
		outputText = outputText.replace( new RegExp( macro, 'g' ), variables[ name ] );
	} );
	return outputText;
}
