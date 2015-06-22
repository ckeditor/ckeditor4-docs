/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

module.exports = function( grunt ) {
	require( 'load-grunt-tasks' )( grunt );

	grunt.loadTasks( 'dev/tasks' );
	grunt.registerTask( 'default', [ 'jsduck:docs', 'copy:source' ] );

	grunt.initConfig( {
		CKEDITOR_DEV: getCKEditorPath(),

		copy: {
			source: {
				files: [
					{
						cwd: 'source',
						expand: true,
						src: [
							'resources/**/*',
							'favicon.ico',
							'.htaccess',
							'images/**/*',
							'license.html'
						],
						dest: 'build/',
						rename: function( dest, src ) {
							return dest + ( dest == 'build/' && src == 'license.html' ? src.replace( 'license', 'LICENSE' ) : src );
						}
					}
				]
			}
		},

		jsduck: {
			docs: {
				src: [
					'<%= CKEDITOR_DEV %>/core',
					'<%= CKEDITOR_DEV %>/plugins',
					'<%= CKEDITOR_DEV %>/adapters',
					'<%= CKEDITOR_DEV %>/ckeditor.js',

					'repos/ckeditor-plugin-scayt',
					'repos/ckeditor-plugin-wsc'
				],

				cmd: 'ckeditor-jsduck',

				options: {
					title: 'CKEditor 4 Documentation',
					'head-html': 'source/head-html.html',
					'head-html-common': 'source/head-html-common.html',
					footer: 'Copyright &copy; 2003-2015, <a href=\"http://cksource.com\" style=\"color:#085585\">CKSource</a> - Frederico Knabben. All rights reserved. | <a href=\"LICENSE.html\" style=\"color:#085585\">License</a> | Generated with <a href=\"https://github.com/senchalabs/jsduck\">JSDuck</a>.',
					tags: 'source/customs.rb',
					warnings: '-nodoc',
					welcome: 'source/welcome.html',
					guides: 'guides/guides.json',
					output: 'build',
					seo: true,
					external: 'Blob,File,FileReader,DocumentFragment',
					exclude: '../ckeditor-dev/plugins/codesnippet/lib'
				}
			}
		}
	} );

	function getCKEditorPath() {
		grunt.log.writeln( 'CKEditor Documentation Builder v' + grunt.file.readJSON( 'package.json' ).version + '.' );

		var ckeditorPath = 'repos/ckeditor-dev';

		if ( process.env.CKEDITOR_DEV ) {
			grunt.log.writeln( '[i] Using CKEditor directory from CKEDITOR_DEV env variable.' );

			ckeditorPath = process.env.CKEDITOR_DEV;
		} else {
			grunt.log.writeln( '[i] CKEDITOR_DEV env variable not set. Looking for', '../ckeditor-dev...'[ 'cyan' ] );

			if ( grunt.file.exists( '../ckeditor-dev/ckeditor.js' ) ) {
				grunt.log.writeln( '[i] Directory', '../ckeditor-dev'[ 'cyan' ], 'found!' );
				ckeditorPath = '../ckeditor-dev';
			} else {
				grunt.log.writeln( '[i] CKEditor directory not found.' );
			}
		}

		grunt.log.writeln( '[i] Using', ckeditorPath[ 'cyan' ], 'as source directory.' );

		return ckeditorPath;
	}
};
