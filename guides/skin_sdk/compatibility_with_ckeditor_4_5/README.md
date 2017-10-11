# Skin Compatibility with CKEditor 4.5

<p class="requirements">
	The features described in this article were introduced in <strong>CKEditor 4.5</strong>.
</p>

Two of the new features introduced in [CKEditor 4.5](https://ckeditor.com/blog/CKEditor-4.4-Released) require additional styles to be added to the skin's CSS. These two features are:

* [Notifications](#!/guide/dev_notifications)
* [Busy dialog state](#!/api/CKEDITOR.dialog-method-setState).

Notifications do not work with an incompatible skin. Dialog state gracefully degrades from a spinner to a static hourglass.

It is highly recommended to make your skin compatible with CKEditor 4.5 because these new features are an important part of CKEditor 4.5 release and will be used by many users.

## Support for Notifications

You can add support for notifications to your skin in these three easy steps.

1. Copy the [notification.css](https://github.com/ckeditor/ckeditor-dev/blob/master/skins/moono/notification.css) file from the [Moono skin](https://ckeditor.com/cke4/addon/moono) to your skin's directory.

2. In the `editor.css` file of your skin add the following line:

	```
	@import url("notification.css");
	```

	See an [example](https://github.com/ckeditor/ckeditor-dev/blob/a513a923aeab1b388efbec2022af1f6d8403376a/skins/moono/editor.css#L47).

3. Modify the `notification.css` file to match your skin's styles.

To test it, you will need to [add the Notification plugin to your build](#!/guide/dev_plugins), or simply [download this package](https://ckeditor.com/cke4/builder/download/ee8ec0f757d5c15bbbb154f30151ea7c) which already contains this plugin and [install your skin in it](#!/guide/skin_sdk_setup). Then, open the `samples/index.html` file in your browser and call the following code to open a few notifications:

	var editor = CKEDITOR.instances.editor;
	editor.showNotification( 'Task started!' );
	editor.showNotification( 'Task aborted!', 'warning' );
	editor.showNotification( 'Task completed!', 'success' );
	editor.showNotification( 'Task in progress...', 'progress', 0.75 );

**Note:** If you see JavaScript alerts instead of notifications, it means that you have not enabled the Notification plugin correctly.

You should see a result similar to:

<img src="guides/skin_sdk_compatibility_with_ckeditor_4_5/notifications.png" alt="Notification example" width="1077" height="412">

## Support for Busy Dialog State

You can add support for displaying that a dialog window is in a busy state by following these steps:

1. In the `dialog.css` file of your skin add the following lines:

	```
	.cke_dialog_spinner
	{
		border-radius: 50%;

		width: 12px;
		height: 12px;
		overflow: hidden;

		text-indent: -9999em;

		border-top: 2px solid rgba(102, 102, 102, 0.2);
		border-right: 2px solid rgba(102, 102, 102, 0.2);
		border-bottom: 2px solid rgba(102, 102, 102, 0.2);
		border-left: 2px solid rgba(102, 102, 102, 1);

		-webkit-animation: dialog_spinner 1s infinite linear;
		animation: dialog_spinner 1s infinite linear;
	}

	/* A GIF fallback for IE8 and IE9 which do not support CSS animations. */
	.cke_browser_ie8 .cke_dialog_spinner,
	.cke_browser_ie9 .cke_dialog_spinner
	{
		background: url(images/spinner.gif) center top no-repeat;
		width: 16px;
		height: 16px;
		border: 0;
	}

	@-webkit-keyframes dialog_spinner
	{
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@keyframes dialog_spinner
	{
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	```

2. Add the [spinner image](https://github.com/ckeditor/ckeditor-dev/blob/a513a923aeab1b388efbec2022af1f6d8403376a/skins/moono/images/spinner.gif) to the `images/` directory of your skin. It is used in Internet Explorer 8-9 which do not support CSS animations.

3. Adjust the added styles to make the modifications match your skin styles.

To test it, open the `samples/index.html` file in your browser, then open some dialog window (e.g. the Link dialog) and execute the following code in the console:

	CKEDITOR.dialog.getCurrent().setState( CKEDITOR.DIALOG_STATE_BUSY );

You should see a spinner in the dialog's title bar.

{@img link_dialog_busy_state.png Busy state displayed in the Link dialog window}
