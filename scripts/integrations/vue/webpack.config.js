/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );

module.exports = {
	context: __dirname,
	mode: 'production',

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

	entry: path.join( __dirname, 'main.js' ),

	output: {
		path: path.join( __dirname, '..', '..', '..', 'docs', 'sdk', 'examples', 'assets', 'vue' ),
		filename: '[name].js',
		libraryTarget: 'umd',
		libraryExport: 'default'
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
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */`,
			raw: true
		} ),
		new VueLoaderPlugin()
	],

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					compact: false,
					presets: [
						[ '@babel/preset-env',
							{
								useBuiltIns: 'usage',
								corejs: 3,
								targets: {
									browsers: [
										'last 2 versions',
										'ie 11'
									],
									node: 10
								}
							}
						]
					]
				}
			} ]
	}
};
