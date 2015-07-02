# Skin Compatibility with CKEditor 4.5

Two of the new features introduced in [CKEditor 4.5](http://ckeditor.com/blog/CKEditor-4.4-Released) require additional styles to be added to a skin's CSS. The two features are &ndash; [notifications](http://docs.ckeditor.com/#!/guide/dev_notifications) and [dialog busy state](http://docs.ckeditor.com/#!/api/CKEDITOR.dialog-method-setState)). Notifications do not work with an incompatible skin. Dialogs gracefully degrade from a spinner to a static hourglass.

It is highly recommended to bring a compatibility for CKEditor 4.5 to your skin because both these new feature are an important part of CKEditor 4.5 release and will be used by many users.

## Support For Notifications

You can add a support for notifications to your skin in these three easy steps.

1. Add the [notification.css](https://github.com/ckeditor/ckeditor-dev/blob/master/skins/moono/notification.css) file from the [Moono skin](http://ckeditor.com/addon/moono) to your skin's directory.

2. In the `editor.css` file of your skin add the following line:

	```
	@import url("notification.css");
	```

	See [example](https://github.com/ckeditor/ckeditor-dev/blob/a513a923aeab1b388efbec2022af1f6d8403376a/skins/moono/editor.css#L47).

3. Modify `notification.css` file to match your skin's styles.

To test it you will need to install the [Notification](http://ckeditor.com/addon/notification) plugin, or you can simply [download this package](http://ckeditor.com/builder/download/ee8ec0f757d5c15bbbb154f30151ea7c) that already contains this plugin and [install your skin in it](#!/guide/skin_sdk_setup). Then, open in your browser the `samples/index.html` file and call the following code to open few notifications:

	var editor = CKEDITOR.instances.editor;
	editor.showNotification( 'Task started!' );
	editor.showNotification( 'Task aborted!', 'warning' );
	editor.showNotification( 'Task completed!', 'success' );
	editor.showNotification( 'Task in progress...', 'progress', 0.75 );

**Note:** If you see JavaScript alerts instead of notifications, then it means that you have not enabled the Notification plugin correctly.

You should see a result similar to:

<img src="guides/skin_sdk_compatibility_with_ckeditor_4_5/notifications.png" alt="Notifications example" width="1077" height="412">

**Note:** Notifications use the same close icon as dialogs do. It may not fix in the custom skin.

**Note:** Because notifications use smart position you can not change their position using only CSS. To learn more check [notifications guide](http://docs.ckeditor.com/#!/guide/dev_notifications).

## Support For Dialog Busy State

You can add a support for displaying that a dialog is in a busy state in these steps.

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

	/* A GIF fallback for IE8 and IE9 which does not support CSS animations. */
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

2. Add the [spinner image](https://github.com/ckeditor/ckeditor-dev/blob/a513a923aeab1b388efbec2022af1f6d8403376a/skins/moono/images/spinner.gif) to the `images/` directory of your skin. It is used in Internet Explorer 8-9 which doesn't support CSS animations.

3. Adjust the added styles to make the modifications match your skin's styles.

To test it open in your browser the `samples/index.html` file, then open some dialog (e.g. the Link dialog) and execute the following code in the console:

	CKEDITOR.dialog.getCurrent().setState( CKEDITOR.DIALOG_STATE_BUSY );

You should see a spinner in the dialog's title bar.