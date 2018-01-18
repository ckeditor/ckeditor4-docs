/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

const Umberto = require( 'umberto' );

module.exports = function( grunt ) {
	require( 'load-grunt-tasks' )( grunt );

	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadTasks( 'dev/tasks' );
	grunt.registerTask( 'default', [ 'jsduck:docs', 'copy:source' ] );
	grunt.registerTask( 'api', [ 'jsduck:api' ] );
	grunt.registerTask( 'umberto', function() {
		const done = this.async();

		const skipApi = grunt.option( 'skipApi' );
		const skipValidation = grunt.option( 'skipValidation' );
		const dev = grunt.option( 'dev' );
		const clean = grunt.option( 'clean' );

		return Umberto.buildSingleProject( {
			skipApi,
			skipValidation,
			dev,
			clean
		} )
			.then( done )
			.catch( err => {
				grunt.log.error( `Building Documentation failed: ${ err }`);
				done();
			} );
	} );
	grunt.registerTask('docs', [ 'api', 'umberto', 'connect' ] );

	grunt.initConfig( {
		path: grunt.option( 'path' ) || getCKEditorPath(),

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
					'<%= path %>/core',
					'<%= path %>/plugins',
					'<%= path %>/adapters',
					'<%= path %>/ckeditor.js',

					'repos/ckeditor-plugin-scayt',
					'repos/ckeditor-plugin-wsc'
				],

				cmd: 'ckeditor-jsduck',

				options: {
					title: 'CKEditor 4 Documentation',
					'head-html': 'source/head-html.html',
					'head-html-common': 'source/head-html-common.html',
					footer: 'Copyright &copy; 2003-2017, <a href=\"http://cksource.com\" style=\"color:#085585\">CKSource</a> - Frederico Knabben. All rights reserved. | <a href=\"LICENSE.html\" style=\"color:#085585\">License</a> | Generated with <a href=\"https://github.com/senchalabs/jsduck\">JSDuck</a>.',
					tags: 'source/customs.rb',
					warnings: [ '-nodoc', '-image_unused' ],
					welcome: 'source/welcome.html',
					guides: grunt.option( 'guides' ) || 'guides/guides.json',
					output: 'build',
					external: 'Blob,File,FileReader,DocumentFragment',
					exclude: '<%= path %>/plugins/codesnippet/lib',
					'ignore-html': 'source'
				}
			},
			api: {
				src: [
					'<%= path %>/core',
					'<%= path %>/plugins',
					'<%= path %>/adapters',
					'<%= path %>/ckeditor.js',

					'repos/ckeditor-plugin-scayt',
					'repos/ckeditor-plugin-wsc'
				],

				cmd: 'ckeditor-jsduck',

				options: {
					tags: 'source/customs.rb',
					warnings: [ '-nodoc', '-image_unused' ],
					output: 'docs/api/data',
					export: 'full',
					external: 'Blob,File,FileReader,DocumentFragment',
					exclude: '<%= path %>/plugins/codesnippet/lib',
					'ignore-html': 'source'
				}
			}
		},

		docs: {
			options: {
				skipApi: false,
				skipValidation: false,
				dev: false,
				clean: true
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					base: 'build/docs',
					keepalive: true,
					open: 'http://localhost:9001/ckeditor4/4.8.0/guide/dev_installation.html'
				}
			}
		}
	} );

	// SEO is on by default, unless disabled via command–line `--seo false`.
	// This option is set here because JSDuck does not simply accept `seo: false` in config.
	if ( grunt.option( 'seo' ) !== false ) {
		grunt.config( 'jsduck.docs.options.seo', true );
	}

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
