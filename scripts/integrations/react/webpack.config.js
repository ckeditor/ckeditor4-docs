/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

module.exports = {
	context: __dirname,
	mode: 'production',

	resolve: {
		extensions: [ '.js', '.jsx' ],
		// `symlink` and `alias` options allow for local testing
		symlinks: false,
		alias: {
			react$: path.resolve( __dirname, '../../..', './node_modules/react' ),
			'react-dom$': path.resolve( __dirname, '../../..', './node_modules/react-dom' )
		}
	},

	devtool: 'source-map',
	performance: {
		hints: false
	},
	externals: {
		ckeditor: {
			root: 'CKEDITOR',
			commonjs2: 'ckeditor',
			commonjs: 'ckeditor',
			amd: 'ckeditor'
		}
	},

	entry: path.join( __dirname, 'Samples.jsx' ),

	output: {
		path: path.join( __dirname, '..', '..', '..', 'docs', 'sdk', 'examples', 'assets', 'react' ),
		filename: '[name].js',
		libraryTarget: 'umd',
		libraryExport: 'default',
		hashFunction: 'sha256'
	},

	optimization: {
		minimizer: [
			new TerserWebpackPlugin( {
				sourceMap: true,
				terserOptions: {
					output: {
						comments: /^!/
					}
				}
			} )
		]
	},

	plugins: [
		new webpack.BannerPlugin( {
			banner: `/*!*
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */`,
			raw: true
		} ),
	],

	module: {
		rules: [ {
			test: /\.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				compact: false,
				presets: [
					[
						'@babel/preset-env',
						{
							useBuiltIns: 'usage',
							corejs: 3,
							targets: {
								browsers: [
									'last 2 versions',
									'ie 11'
								]
							}
						}
					],
					'@babel/preset-react'
				]
			}
		} ]
	}
};
