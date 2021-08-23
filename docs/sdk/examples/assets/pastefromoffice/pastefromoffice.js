/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

 var sources = [
    {
        name: 'Google Docs',
        link: 'pastefromgoogledocs.html',
        linkName: 'Paste from Google Docs',
        regex: /id=(\"|\')?docs\-internal\-guid\-/,
        isAlreadyShow: false
    },
    {
        name: 'Microsoft Word',
        link: 'pastefromword.html',
        linkName: 'Paste from Word',
        regex: getProperWordRegex(),
        isAlreadyShow: false
    },
    {
        name: 'Microsoft Excel',
        link: 'pastefromexcel.html',
        linkName: 'Paste from Excel',
        regex: /<meta\s*name=generator\s*content="Microsoft\s*Excel\s*\d+"?\/?/gmi,
        isAlreadyShow: false
    },
    {
        name: 'LibreOffice',
        link: 'pastefromlibreoffice.html',
        linkName: 'Paste from LibreOffice',
        regex: /<meta\s+name=["']?generator["']?\s+content="LibreOffice\s*\d+"?\/?/gmi,
        isAlreadyShow: false
    }
];

CKEDITOR.on( 'instanceReady', function( evt ) {
	var editor = evt.editor;

	editor.on( 'paste', function( evt ) {
		var pasteData = getClipboardData( evt.data, 'text/html' );
		if( !pasteData ){
			return;
		}

		for ( var i = 0; i < sources.length; i++ ) {
			var source = sources[ i ];

			if( source.regex.test( pasteData ) && !sources[ i ].isAlreadyShow ) {
				var notice = document.querySelector( '.main__notification.notice' );

				// Remove notification when user trying to paste content from other source than previous. e.g. Word and Excel.
				if( notice ){
					notice.remove();
				}

				createClipboardInputNotification( i );
				sources[ i ].isAlreadyShow = true;
				break;
			}
		}
	}, null, null, 9 );
} );

function getClipboardData( data, type ) {
	var dataTransfer;

	if ( !CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && type !== 'text/html' ) {
		return null;
	}

	dataTransfer = data.dataTransfer.getData( type, true );

	// Some commands fire paste event without setting dataTransfer property. In such case
	// dataValue should be used for retrieving HTML.
	if ( !dataTransfer && type === 'text/html' ) {
		return data.dataValue;
	}

	return dataTransfer;
}

function getProperWordRegex() {
    if( CKEDITOR.env.ie ){
        return /(class="?Mso|style=["'][^"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/i;
    }

    return CKEDITOR.env.safari ? /xmlns:o="urn:schemas-microsoft-com/i : /<meta\s*name="?generator"?\s*content="?microsoft\s*word\s*\d+"?\/?>/i;
};

// During building the docs all extra links from the head tag are removed, so we need to add it dynamically.
function injectStyle() {
    var style = document.createElement( 'link' );

    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = 'assets/pastefromoffice/contents.css';

    document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );
};

// The notification should contain the links to the demos where user can test rich formatting from.
function createClipboardInputNotification( index ) {
    var title = 'Hello!';
    var message = '<p>We detected that you tried to paste content from <strong>' + sources[ index ].name + '</strong>.</p>' +
    '<p>Please bear in mind that the editor demo to which you try to paste does not have all the features enabled.' +
        'Due to that, unsupported formatting is being stripped.</p>' +
    '<p>Check out the <a href="' + sources[ index ].link + '">' + sources[ index ].linkName + '</a> demos for the best experience.</p>';

    window.createNotification( title, message );
};

/**
* Creates a notification and appends it to the `.main__content` element.
*
* @param {String} title A title of the notification.
* @param {String} message A message to display in the notification.
*
* @returns {Object} A notification element.
*/
window.createNotification = function( title, message ) {
    var notificationTemplate = '<h3 class="main__notification-title">' + title + '</h3>' +
        '<div class="main__notification-body">' + message + '</div>';

    var notification = document.createElement( 'div' );
    var close = document.createElement( 'button' );

    close.className += 'main__notification-close';
    close.innerText = '✕';
    close.setAttribute( 'aria-label', 'Close the notification' );

    notification.className += 'main__notification notice';
    notification.innerHTML = notificationTemplate;
    // ATM we support only top-right position.
    notification.style.top = '110px';
    notification.style.right = '10px';
    notification.appendChild( close );

    var activeNotifications = document.querySelectorAll( '.main__notification' );

    // Translate the position of multiple notifications (just in case).
    if ( activeNotifications.length > 0 ) {
        var moveOffset = activeNotifications.length * 10;

        notification.style.top = parseInt( notification.style.top ) + moveOffset + 'px';
        notification.style.right = parseInt( notification.style.right ) + moveOffset + 'px';
    }

    // Append notification to the `.main__content` element.
    var main = document.querySelector( '.main__content' );
    main.appendChild( notification );

    close.addEventListener( 'click', function() {
        main.removeChild( notification );
    } );

    return notification;
};

window.onload = function () {
    injectStyle();
};
