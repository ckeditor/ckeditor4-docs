/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const path = require( 'path' );
const fs = require( 'fs-extra' );
const chalk = require( 'chalk' );
const { spawn } = require( 'child_process' );

module.exports = ( { destinationPath } ) => new Promise( ( resolve, reject ) => {
    if ( !destinationPath ) {
        reject( new Error( 'There is no destination path given.' ) )
    }
    return fs.remove( path.join( destinationPath, 'ckeditor' ) )
        .then( () => buildAndCopyCkeditor( destinationPath ) )
        .then( () => {
            resolve();
        } );
} );

function buildAndCopyCkeditor( destinationPath ) {
    console.log( chalk.greenBright( 'Building CKEditor...' ) );
    return buildCkeditor()
        .then( () => copyCkeditor( destinationPath ) );
}

function buildCkeditor() {
    return new Promise( ( resolve, reject ) => {
        const build = spawn( path.join( process.cwd(), 'repos', 'ckeditor-presets', 'build.sh' ), [ 'standard', 'all' ] );
        build.stdout.on( 'data', data => { process.stdout.write( data.toString() ) } );
        build.on( 'close', resolve );
        build.on( 'error', reject );
    } );
}

function copyCkeditor( destinationPath ) {
    return getCkeditorVersion( process.cwd() )
        .then( ckeditorVersion => fs.copy(
                path.join( process.cwd(), 'repos', 'ckeditor-presets', 'build', ckeditorVersion, 'standard-all', 'ckeditor' ),
                path.join( destinationPath, 'ckeditor' )
            )
        );
}

function getCkeditorVersion( basePath ) {
    return fs.readJson( path.join( basePath, 'repos', 'ckeditor-presets', 'ckeditor', 'package.json' ) )
        .then( data => data.version );
}