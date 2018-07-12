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
    if ( dev ) {
        return removeCkeditorFolder( path.join( destinationPath, 'ckeditor' ) )
            .then( () => linkCkeditor( destinationPath ) );
    } else {
        return removeCkeditorFolder( path.join( destinationPath, 'ckeditor' ) )
            .then( () => buildAndCopyCkeditor( destinationPath ) )
            .then( resolve );
    }
} );

function linkCkeditor( destinationPath ) {
    return new Promise( ( resolve, reject ) => {
        console.log( `Trying to use local ${ chalk.cyanBright( 'ckeditor-dev' ) } folder.` );
        const ckeditorPath = path.join( process.cwd(), '..', 'ckeditor-dev' );
        promisify( fs.stat, fs )( ckeditorPath )
            .then( stat => {
                if ( !stat.isDirectory() ) {
                    console.log( chalk.red( 'CKEditor folder not found. I\'m using local one.' ) );
                    return buildAndCopyCkeditor( destinationPath )
                } else {
                    return promisify( fs.lstat, fs )( path.join( destinationPath, 'ckeditor' ) )
                        .catch( () => {
                            const relativePathToCkeditor = path.relative( destinationPath, ckeditorPath );
                            return promisify( fs.symlink, fs )( relativePathToCkeditor, path.join( destinationPath, 'ckeditor' ) )
                                .then( () => { console.log( `Symlink to local ${ chalk.cyanBright( 'ckeditor-dev' ) } directory created.` ) })
                        } )
                }
            } );
    } );
};

function removeCkeditorFolder( vendorFolderPath ) {
    return promisify( rimraf, this )( vendorFolderPath );
}

function buildAndCopyCkeditor( destinationPath ) {
    console.log( 'Building CKEditor...' );
    return buildCkeditor()
        .then( () => copyCkeditor( destinationPath ) )
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