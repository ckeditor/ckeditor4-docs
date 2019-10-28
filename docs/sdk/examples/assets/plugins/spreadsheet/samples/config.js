CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// %REMOVE_START%
	config.plugins =
		'ajax,' +
		'undo,' +
		'justify,' +
		'enterkey,' +
		'about,' +
		'basicstyles,' +
		'clipboard,' +
		'elementspath,' +
		'floatingspace,' +
		'htmlwriter,' +
		'removeformat,' +
		'sourcedialog,' +
		'tab,' +
		'toolbar,' +
		'undo,' +
		'resize,' +
		'wysiwygarea,' +
		'spreadsheet,' +
		'contextmenu,' +
		'colorbutton,' +
		'table';
	// %REMOVE_END%

	config.toolbarGroups = [
		{ name: 'insert' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'colors' },
		{ name: 'paragraph', groups: [ 'align' ] },
		{ name: 'clipboard', groups: [ 'undo' ] },
		{ name: 'document', groups: [ 'mode' ] }
	];

	config.removeButtons = 'Table,Cut,Copy,Paste';

	config.height = 550;

	config.extraAllowedContent = 'h1;a[!href]';

	// Plugin location needs to be explicitly provided as it's loaded from outside of CKEditor location.
	var href = location.href.replace( /\/(index.html)?(\/)?$/, '' );

	config.contentsCss = [ config.contentsCss, href + '/css/styles.css' ];

	CKEDITOR.plugins.addExternal( 'spreadsheet', href + '/../' );

};
