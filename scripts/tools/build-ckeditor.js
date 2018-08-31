/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const path = require( 'path' );
const fs = require( 'fs' );
const promisify = require( './promisify.js' );
const rimraf = require( 'rimraf' );
const chalk = require( 'chalk' );
const { spawn } = require( 'child_process' );
const { ncp } = require( 'ncp' );

module.exports = ( { destinationPath, dev = false } ) => new Promise( ( resolve, reject ) => {
    if ( !destinationPath ) {
        reject( new Error( 'There is no destination path given' ) )
    }
    return removeCkeditorFolder( path.join( destinationPath, 'ckeditor' ) )
        .then( () => buildAndCopyCkeditor( destinationPath ) )
        .then( () => {
            resolve();
        } );
} );

function removeCkeditorFolder( vendorFolderPath ) {
    return promisify( rimraf, this )( vendorFolderPath );
}

function buildAndCopyCkeditor( destinationPath ) {
    console.log( chalk.greenBright( 'Building CKEditor...' ) );
    return buildCkeditor()
        .then( () => copyCkeditor( destinationPath ) );
}

function buildCkeditor() {
    return new Promise( ( resolve, reject ) => {
        const build = spawn( path.join( process.cwd(), 'repos', 'ckeditor-presets', 'build.sh' ), [ 'standard', 'all' ] );
        build.stdout.on( 'data', data => { console.log( data.toString().trim() ) } );
        build.on( 'close', resolve );
        build.on( 'error', reject );
    } );
}

function copyCkeditor( destinationPath ) {
    return getCkeditorVersion( process.cwd() )
        .then( ckeditorVersion => promisify( ncp, this )( 
            path.join( process.cwd(), 'repos', 'ckeditor-presets', 'build', ckeditorVersion, 'standard-all', 'ckeditor' ),
            path.join( destinationPath, 'ckeditor' ) )
        );
}

function getCkeditorVersion( basePath ) {
    const ckeditorPath = path.join( basePath, 'repos', 'ckeditor-presets', 'ckeditor' );
        return promisify( fs.stat, fs )( path.join( ckeditorPath, 'package.json' ) )
            .then( status => {
                if ( status.isFile() ) {
                    return promisify( fs.readFile, fs)( path.join( ckeditorPath, 'package.json' ) );
                } else {
                    return Promise.reject();
                }
            } )
            .then( data => data.toString() )
            .then( data => JSON.parse( data ).version );
}