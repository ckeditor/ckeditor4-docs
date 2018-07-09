/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const path = require( 'path' );
const fs = require( 'fs' );
const buildCkeditor = require( './tools/build-ckeditor' );
const promisify = require( './tools/promisify' );

const destinationPath = path.join( process.cwd(), 'docs', 'sdk', 'examples', 'vendors' );

module.exports = new Promise( () => makeFolder( destinationPath )
    .then( () => buildCkeditor( {
        destinationPath,
        dev: false
        } )
    )
    .then( () => process.exit() )
    .catch( ( err ) => {
        process.exitCode = 1;
        throw err;
    } )
);

function makeFolder( createdFolder ) {
    return new Promise( ( resolve, reject ) => {
        promisify( fs.lstat, fs )( createdFolder )
            .then( stat => {
                if ( stat.isDirectory() ) {
                    resolve( createdFolder );
                } else {
                    reject();
                }
            } )
            .catch( () => {
                promisify( fs.mkdir, fs )( createdFolder )
                    .then( () => resolve( createdFolder ) )
            } )
    } );
};