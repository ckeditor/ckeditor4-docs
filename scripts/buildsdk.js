/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const path = require( 'path' );
const fs = require( 'fs-extra' );
const buildCkeditor = require( './tools/buildckeditor' );
const updateConfigFile = require( './tools/updateconfigfile' );
const chalk = require( 'chalk' );

module.exports = new Promise( ( resolve, reject ) => {
	let destinationPath;

	getConfigSdkPath()
		.then( configParts => { destinationPath = path.join( process.cwd(), 'docs', ...configParts, 'vendors' ) } )
		.then( () => fs.ensureDir( destinationPath ) )
		.then( () => buildCkeditor( {
			destinationPath
		} ) )
		.then( () => updateConfigFile( {
			configFileSrc: path.join( process.cwd(), 'commonconfig.json' ),
			configFileDst: path.join( destinationPath, 'ckeditor', 'config.js' )
		} ) )
		.then( () => {
			console.log( chalk.greenBright( 'Building CKEditor in presets complete.' ) );
			resolve();
		} )
		.catch( ( err ) => {
			process.exitCode = 1;
			reject( err );
		} );
} );

function getConfigSdkPath() {
	return fs.readJson( path.join( process.cwd(), 'umberto.json' ) )
		.then( data => {
			const sdkGroup = data.groups.find( g => g.id === 'sdk' );
			return sdkGroup.sourceDir.split( '/' );
		} );
}
