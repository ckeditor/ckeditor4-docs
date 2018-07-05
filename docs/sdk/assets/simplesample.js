/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see license.html or https://sdk.ckeditor.com/license.html.
 */

( function() {
	'use strict';
	window.onbeforeunload = function() {
		if (popup) {
			popup.close();
		}
	};

	var simpleSample = {},
		HTML5 = {
			downloadAttr: typeof document.createElement( 'a' ).download != 'undefined'
		},
		SDK_ONLINE_URL = 'https://sdk.ckeditor.com/',
		SHORT_EDITOR_CONTENT = '<p>This is some <strong>sample text</strong>. You are using <a href="https://ckeditor.com/">CKEditor</a>.</p>',
		popup,
		placeholders = [];

	// IE8...
	if ( typeof String.prototype.trim !== 'function' ) {
		String.prototype.trim = function() {
			return this.replace( /^\s+|\s+$/g, '' );
		}
	}

	if ( !Object.keys ) {
		Object.keys = function( o ) {
			if ( o !== Object( o ) ) {
				throw new TypeError( 'Object.keys called on a non-object.' );
			}

			var k = [], p;
			for ( p in o ) {
				if ( Object.prototype.hasOwnProperty.call( o, p ) ) {
					k.push( p );
				}
			}

			return k;
		}
	}

	function attachEvent( elem, evtName, callback ) {
		if ( elem.addEventListener ) {
			elem.addEventListener( evtName, callback, false );
		} else if ( elem.attachEvent ) {
			elem.attachEvent( 'on' + evtName , callback );
		} else {
			throw new Error( 'Could not attach event.' );
		}
	}

	function accept( node, visitator ) {
		var children;

		// Handling node as a node and array
		if ( node.children ) {
			children = node.children;

			visitator( node );
		} else if ( typeof node.length == 'number' ) {
			children = node;
		}

		var i = children.length;
		while( i-- ) {
			accept( children[ i ], visitator );
		}
	}

	// Please note: assume that there is only one element in HTML
	function createFromHtml( html ) {
		var div = document.createElement( 'div' );

		setInnerHTML( div, html );
		return div.firstChild;
	}

	// http://allofetechnical.wordpress.com/2010/05/21/ies-innerhtml-method-with-script-and-style-tags/
	function setInnerHTML( inDOMNode, inHTML ) {
		inDOMNode.innerHTML = '_' + inHTML;
		inDOMNode.removeChild( inDOMNode.firstChild );
	}

	function prepareSamplesNames() {
		var meta = document.getElementsByTagName( 'meta' ),
			sdkMeta = null;

		accept( meta, function( element ) {
			if ( element.name == 'sdk-samples' ) {
				sdkMeta = element;
			}
		} );

		return sdkMeta ? sdkMeta.content.split( '|' ) : '';
	}

	contentLoaded( window, onLoad );

	function onLoad() {
		var resources = prepareSampleResources(),
			body = document.getElementsByTagName( 'body' )[ 0 ],
			sections = document.getElementsByTagName( 'section' ),
			sdkContents;

		simpleSample.metaNames = prepareSamplesNames();

		var samplesList = createFromHtml( prepareSamplesList( resources ) );

		initSidebarAccordion( body );

		accept( sections, function( element ) {
			var classAttr = element.attributes && element.attributes.getNamedItem( 'class' );

			if ( classAttr && classAttr.value == 'sdk-contents' ) {
				sdkContents = element;
			}
		} );

		if ( Object.keys( resources ).length ) {
			sdkContents.appendChild( samplesList );
		}

		// http://stackoverflow.com/questions/5796718/html-entity-decode
		var decodeEntities = ( function() {
			// this prevents any overhead from creating the object each time
			var element = document.createElement( 'div' );

			function decodeHTMLEntities ( str ) {
				if( str && typeof str === 'string' ) {
					// strip script/html tags
					str = str.replace( /<script[^>]*>([\S\s]*?)<\/script>/gmi, '' );
					str = str.replace( /<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '' );
					element.innerHTML = str;
					str = element.textContent;
					element.textContent = '';
				}

				return str;
			}

			return decodeHTMLEntities;
		} )();

		attachEvent( samplesList, 'click', function( e ) {
			var clicked = e.target || e.srcElement,
				relLi,
				sampleHash;

			e.returnValue = false;
			e.preventDefault && e.preventDefault();

			if ( clicked instanceof HTMLAnchorElement ) {
				relLi = clicked.parentNode;
			} else {
				return false;
			}

			sampleHash = relLi.attributes.getNamedItem( 'data-sample' ).value;
			showSampleSource( sampleHash.replace( /\D/g, '' ) );

			return false;
		} );

		function getSampleSourceCode( sampleId ) {

			var dialog = createSampleSourceCode( sampleId, false, false );

			return {
				dialog: dialog,
				download: decodeEntities( dialog )
			};
		}
		simpleSample.getSampleSourceCode = getSampleSourceCode;

		function createSampleSourceCode( id, wrapInHtmlStructure, wrapInCodePre, doubleEscapeTextAreaContent ) {
			var sampleResources = resources[ id ],
				resourcesString = '',
				headResources = [],
				result;

			wrapInHtmlStructure = ( wrapInHtmlStructure === false ? false : true );
			wrapInCodePre = ( wrapInCodePre === false ? false : true );
			doubleEscapeTextAreaContent = ( doubleEscapeTextAreaContent === false ? false : true );

			var i = 0,
				max = sampleResources.length;
			for ( ; i < max; i++ ) {
				var resource = sampleResources[ i ],
					isHeadResource = ( resource.name == 'LINK' || resource.name == 'STYLE' );

				if ( isHeadResource ) {
					headResources.push( resource.html );
				} else {
					resourcesString += resource.html;
				}
			}

			if ( !resourcesString.match( /<script[^>]*ckeditor\.js"[^>]*>/gi ) ) {
				headResources.unshift( '<script src="https://cdn.ckeditor.com/<CKEditorVersion>/standard-all/ckeditor.js"></script>' );
			}
			headResources = headResources.join( '' );

			function getTemplatePre( headResources, title ) {
				return [
					'<!DOCTYPE html>',
					'<html>',
					'<head>',
					'<meta charset="utf-8">',
					'<meta name="robots" content="noindex, nofollow">',
					'<title>' + title + '</title>',
					headResources,
					'</head>',
					'<body>'
				];
			}

			function getTemplatePost() {
				return [
					'</body>',
					'</html>'
				];
			}

			resourcesString = getTemplatePre( headResources, simpleSample.metaNames[ id - 1 ] ).join( '' ) + resourcesString + getTemplatePost().join( '' );

			// Removing data-sample attribute.
			resourcesString = resourcesString.replace( /(data\-sample=(?:\"|\')\S*(?:\"|\')\s*)/g, '' );

			resourcesString = html_beautify( resourcesString, {
				'indent_size': 1,
				'indent_char': '\t'
			} );

			// Here we are going to remove extra new line characters and white spaces added by beautifier.
			resourcesString = resourcesString.replace( /(<script>)(\n)([\s\S]*?)(\n)([\s\S]*?)(\<\/script\>)/g, function( match, $1, $2, $3, $4, $5, $6 ) {
				return $1 + $3.trim() + $6;
			} );

			resourcesString = resourcesString.replace( /&/g, '&amp;' ).replace( /\</g, '&lt;' ).replace( /\>/g, '&gt;' );

			resourcesString = resourcesString.replace( /(\n)(\s*)([^\n]*)\[(\d)\]PLACEHOLDER/g, function( match, $0, $1, $2, $3 ) {
				var placeholder = placeholders[ $3 ],
					lines = placeholder.content.split( '\n' ), result = '',
					noEndLineChar = ( match.indexOf('textarea') != -1 && !placeholder.example.preserveWhitespace );

				// Removing whitespaces in each line.
				var max = lines.length;
				for ( var i = 0; i < max; i++ ) {
					var lineData = lines[ i ].match( /(\s*)([\S\s]*)/ ),
						indent, content;

					// Don't want extra indent and set whole line (with whitespaces) as a content.
					if ( placeholder.indent === false ) {
						indent = false;
						content = noEndLineChar ? lines[ i ].trim() : lines[ i ];
					} else {
						indent = lineData[ 1 ].length - placeholder.indent;
						content = lineData[ 2 ];
					}

					lines[ i ] = {
						indent: indent,
						content: content
					};
				}

				var getIndentChars = function( char, count ) {
					count = count < 0 ? 0 : count;
					var result = '';
					while( count-- ) {
						result += char;
					}
					return result;
				};

				// Fake line to make indentation, because join make indentation only between lines - not at the beginning.
				lines.unshift( { indent: lines[ 0 ].indent, content: '' } );

				// Indent one tab extra.
				var i = 0,
					max = lines.length;
				for ( var i = 0; i < max; i++ ) {
					var line = lines[ i ];
					// For the first line we don't want to create indentation #93.
					result += ( i == 0 ? '' : getIndentChars( '\t', line.indent ) ) + line.content + ( noEndLineChar ? '' : '\n' );
				}

				result = $2 + ( doubleEscapeTextAreaContent ? result.replace( /\&/g, '&amp;' ) : result );

				result = '\n' + $0 + $1[ 0 ] + result.trim() + $0 + $1[ 0 ];

				return result;
			} );

			resourcesString = fixUrls( resourcesString );
			// Fix script tag that loads ckeditor.js, empty space inside is not needed.
			resourcesString = resourcesString.replace( /(&gt;)\s*(&lt;\/script&gt;)/gi, function( match, $1, $2 ) {
				return $1 + $2;
			} );

			return [
				wrapInHtmlStructure ? getTemplatePre( [], simpleSample.metaNames[ id - 1 ] ).join( '' ) : '',
				wrapInCodePre ? '<code><pre>' : '',
				resourcesString,
				wrapInCodePre ? '</pre></code>' : '',
				wrapInHtmlStructure ? getTemplatePost().join( '' ) : ''
			].join( '' ).replace( /(data-sample[\s|\S]*?\"[\s|\S]*?\")/g, '' );
		}
		simpleSample.createSampleSourceCode = createSampleSourceCode;

		var showSampleSource;
		if ( !this.picoModal || ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 ) ) {
			showSampleSource = function( sampleId ) {
				var code = createSampleSourceCode( sampleId );
				if ( popup ) {
					popup.close();
				}

				popup = window.open( '', '', 'width=800, height=600' );

				popup.document.write( code );
			};
		} else {
			showSampleSource = function( sampleId ) {
				var sampleSource = getSampleSourceCode( sampleId );
				var sampleName = simpleSample.metaNames[ sampleId - 1 ].toLowerCase().replace( / /g, '_' ),
					code = [
						'<div>',
							'<a href="#" class="source-code-tab source-code-tab-select">Select Code</a>',
							( HTML5.downloadAttr ? '<a href="data:text/html;charset=utf-8,' + encodeURIComponent( sampleSource.download ) + '" class="source-code-tab" download="' + sampleName + '.html">Download</a>' : '' ),
							'<div class="textarea-wrapper">',
								'<textarea>',
									sampleSource.dialog,
								'</textarea>',
							'</div>',
						'</div>'
					].join( '' ),
					modal = picoModal( {
						content: code,
						modalClass: 'source-code',
						modalStyles: null,
						closeStyles: null,
						closeHtml: '<img src="../template/theme/img/close.png" alt="Close" />'
					} ),
					modalElem = new CKEDITOR.dom.element( modal.modalElem() ),
					selectButton = modalElem.findOne( 'a.source-code-tab-select' ),
					textarea = modalElem.findOne( 'textarea' );

				function escListener( evt ) {
					if ( evt.keyCode == 27 ) {
						modal.close();
					}
				}

				selectButton.on( 'click', function( evt ) {
					textarea.$.select();
					evt.data.preventDefault();
				} );

				modal.afterShow( function() {
					addEventListener( 'keydown', escListener );
				} ).afterClose( function() {
					removeEventListener( 'keydown', escListener );
				} ).show();
			};
		}

		if ( window.location.hash ) {
			showSampleSource( window.location.hash.replace( /\D/g, '' ) );
			window.location.hash = '';
		}

		function fixUrls( str ) {
			return str

				// "../../something.html" ==> "https://sdk.ckeditor.com/something.html"
				.replace( /\.\.\/\.\.\//g, function() {
					return SDK_ONLINE_URL;
				} )

				// "../something.html"    ==> "https://sdk.ckeditor.com/something.html"
				.replace( /\.\.\//g, function() {
					return SDK_ONLINE_URL;
				} )

				// "./example.php"        ==> "https://sdk.ckeditor.com/samples/example.php"
				.replace( /("|')(:?\.\/)(.*?\.(?:html|php))/g, function( match, p1, p2, p3 ) {
					return p1 + SDK_ONLINE_URL + 'samples/' + p3;
				}, '$1' + SDK_ONLINE_URL + 'samples/$3' )

				// "assets/some.php"      ==> "https://sdk.ckeditor.com/samples/assets/some.php"
				.replace( /("|')(assets\/)/g, function( match, p1, p2 ) {
					return p1 + SDK_ONLINE_URL + 'samples/' + p2;
				} );
		}

		function prepareSampleResources() {
			var exampleBlocks = [],
				examples = {};

			var k = 0;
			accept( document.getElementsByTagName( 'html' )[ 0 ], function( node ) {
				var attrs = node.attributes,
					sample = attrs ? attrs.getNamedItem( 'data-sample' ) : null,
					sampleClear = attrs ? attrs.getNamedItem( 'data-sample-clear' ) : null,
					preserveWhitespace = attrs ? attrs.getNamedItem( 'data-sample-preserveWhitespace' ) : null;

				if ( sample ) {
					var typeAttr = attrs.getNamedItem( 'type' );

					if ( typeAttr && typeAttr.value == 'template' ) {
						node = createFromHtml( node.innerHTML.replace( /&lt;/g, '<' ).replace( /&gt;/g, '>' ).trim() );
					} else {
						node = createFromHtml( node.outerHTML.trim() );
					}

					// Removing dynamically created content from nodes.
					accept( node, function ( node ) {
						var attrs = node.attributes,
						className = attrs ? attrs.getNamedItem( 'class' ) : null,
						style = attrs ? attrs.getNamedItem( 'style' ) : null,
						sampleClear = attrs ? attrs.getNamedItem( 'data-sample-clear' ) : null;

						// Unwanted style attribute in textarea.
						if ( node.nodeName == 'TEXTAREA' && style && style.value ) {
							attrs.removeNamedItem( 'style' );
						}

						// Unwanted container "cke_textarea_inline".
						if ( className && className.value === 'cke_textarea_inline' ) {
							node.parentNode.removeChild( node );
						}

						// Unwanted node content.
						if ( sampleClear ) {
							if ( typeof node.value === 'string' ) {
								node.value = '';
							}
							if ( typeof node.innerHTML === 'string' ) {
								node.innerHTML = '';
							}
						}
					} );

					var example = {
						node: node,
						html: node.outerHTML.trim(),
						usedIn: sample.value.split( ',' ),
						name: node.nodeName,
						preserveWhitespace: preserveWhitespace
					};

					example.innerHTML = node.innerHTML;

					// When attribute is present we don't want replace content with placeholder.
					if ( !sampleClear ) {
						// Setting placeholder for textareas and keeping reference to content in global array.
						var regexpTextarea = /(\<textarea.*?\>)([\s\S]*?)\n*(\s*)(\<\/textarea>)/g,
							regexpScript = /(\<script.*?\>)([\s\S]*?)\n*(\s*)(\<\/script>)/g;

						var pickPlaceholder = function( text, $1, $2, $3, $4 ) {
							$3 = $3.replace( '\n', '' );
							var indent = $3.length - 1 < 0 ? 0 : $3.length - 1,
								shortContent = $1.indexOf( 'data-sample-short' ) !== -1,
								content;

							if ( shortContent ) {
								content = SHORT_EDITOR_CONTENT.replace( /\</g, '&lt;' ).replace( /\>/g, '&gt;' );
							} else {
								content = $2[0] === '\n' ? $2.replace( '\n', '' ) : $2;
							}

							placeholders.push( {
								indent: preserveWhitespace ? false : indent,
								content: content,
								example: example
							} );
							return $1 + '[' + k++ + ']PLACEHOLDER' + $4;
						};

						example.html = example.html.replace( regexpTextarea, pickPlaceholder );
						example.html = example.html.replace( regexpScript, pickPlaceholder );
					}

					exampleBlocks.push( example );
				}
			} );

			// Sorting resources by usage.
			var i = exampleBlocks.length;
			while( i-- ) {
				var block = exampleBlocks[ i ],
					j = block.usedIn.length;

				while( j-- ) {
					var usageName = block.usedIn[ j ];

					examples[ usageName ] = examples[ usageName ] || [];
					examples[ usageName ].push( block );
				}
			}

			return examples;
		}
	}

	function prepareSamplesList( examples ) {
		var template = '<div><h2>Get Sample Source Code</h2>' + '<ul>';

		for ( var id in examples ) {
			template += '<li data-sample="sample-' + id + '"><a href="#sample-' + id + '">' + simpleSample.metaNames[ id - 1 ] + '</a></li>';
		}
		template += '</ul></div>';

		return template;
	}

	function initSidebarAccordion( body ) {
		var sidebar = body.querySelector( 'nav.sdk-sidebar' );

		if ( document.title.indexOf( 'Homepage' ) != -1 ) {
			activateGroup( sidebar.querySelector( 'h3' ) );
		}

		if ( !sidebar ) {
			console.warn( 'Couldn\'t find sidebar'  );
			return;
		}

		attachEvent( sidebar, 'click', function( evt ) {
			activateGroup( evt.target || evt.srcElement );
		} );

		function activateGroup( header ) {
			if ( header.tagName == 'H3' ) {
				header.className = header.className == 'active' ? '' : 'active';

				// Force redraw on IE8.
				header.parentElement.className = header.parentElement.className;
			}
		}
	}

	window.simpleSample = simpleSample;
}() );
