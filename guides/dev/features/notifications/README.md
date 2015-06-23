<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Notifications

<p class="requirements">This feature was introduced in <strong>CKEditor 4.5</strong>. It is provided through an optional plugins <a href="http://ckeditor.com/addon/notification">Notification</a> and <a href="http://ckeditor.com/addon/notificationaggregator">Notification Aggregator</a> that are not included in the CKEditor presets available from the <a href="http://ckeditor.com/download">Download</a> site and <a href="#!/guide/dev_plugins">need to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.</p>

Since CKEditor 4.5 it is possible to use notifications to show the user information about operations status in the editor. Notifications let you show information in a consistent way and all plugins using notifications API will show information in the same way. This API also allows you to integrate editor's notifications with your website (your CMS for example). Note that notifications do not work with dialogs so no dialog should be displayed when the notifications is to be shown.

There are multiple types of notifications. To learn more check {@link CKEDITOR.plugins.notification#type}.

{@img notification.png Notifications example}

To show a simple notification you need to {@link CKEDITOR.plugins.notification#constructor create notification} instance and call the {@link CKEDITOR.plugins.notification#show} method or you can use {@link CKEDITOR.editor#showNotification} shortcut:

	// Editor needs notification plugin.
	var editor = CKEDITOR.replace( 'editor1', {
		extraPlugins: 'notification'
	} );

	editor.once( 'instanceReady', function() {
		// Create and show notification.
		var notification1 = new CKEDITOR.plugins.notification( editor, {
			message: 'Error occurred',
			type: 'warning'
		} );
		notification1.show();

		// Use shortcut - it has the same result as above.
		var notification2 = editor.showNotification( 'Error occurred', 'warning' );
	} );

Note that {@link CKEDITOR.editor#showNotification} method is available even without the the notification plugin. Then an alert will be shown instead of notification.

Once you create a notification you can update its state and even change its type:

	var notification = editor.showNotification( 'Uploading...', 'progress', 0.25 );

	// ...

	notification.update( { progress: 0.75 } );

	// ...

	notification.update( { type: 'success', message: 'File uploaded.' } );

Note that someone may implement the notification interface in the custom way, for example show notification with a slide-in animation. Then updating one notification is not the same as hiding one and showing another. One notification should show the status of one process so it is better to updated it to the `success` type instead of creating a new one every time the status changes.

To learn more about notifications API check {@link CKEDITOR.plugins.notification} documentation.

## Notification Interface

By default notifications are shown at the top center of the editable area. However, they try to be visible as long as possible without leaving the editable area. It means that notifications will move if part of the editable will be out of the viewport, so you can edit very long document and notification will still be visible. They also move below toolbar if you are using [floating toolbar](#!/guide/dev_uitypes-section-floating-user-interface), but they will not be visible at all if the whole editor is not visible.

{@img notification_stick.png Notifications sticks to the viewport border to be visible as long as possible}

Notifications can also hide after a timeout. By default `info` and `success` notifications hide after 5 seconds what can be changed using {@link CKEDITOR.config#notification_duration}. The `warning` notification needs to be hidden manually. The `progress` notifications are also not hidden automatically. They wait for the next progress update and to be finally changed to `success` or `warning`. It is also possible to change the notification duration per instance.

User can also hide notifications manually: by using the `X` button or *Esc* key.

If you want to make sure that a notification will be shown after an update, then that update needs to be marked as
{@link CKEDITOR.plugins.notification#update important}. This is also important because of the accessibility reason &ndash; important updates will be read by screen reader and rest of the updates will not, because we do not want to spam the user with tons of messages if a notification is updated very often.

## Notification Integration

If you want to replace standard notification interface with a custom one or you want to integrate editors notifications with your website/CMS ones you can do it by listening to notification events: {@link CKEDITOR.editor#notificationShow}, {@link CKEDITOR.editor#notificationUpdate} and {@link CKEDITOR.editor#notificationHide}.

To prevent notifications from being shown it is not enough to prevent {@link CKEDITOR.editor#notificationShow} but you need too cancel {@link CKEDITOR.editor#notificationUpdate} too, otherwise important updates will display the notification.

	editor.on( 'notificationShow', function( evt ) {
		alert( evt.data.notification.message );

		// Do not show the default notification.
		evt.cancel();
	} );

	editor.on( 'notificationUpdate', function( evt ) {
		// Do not show the notification even if update was important.
		evt.cancel();
	} );

Note that if you cancel {@link CKEDITOR.editor#notificationUpdate} event it means only that the notification will not be shown even if the updated was important. Notification object will be updated anyway, including {@link CKEDITOR.plugins.notification#element} property, so you do not need to do it manually. The event is fired before updating notifications object so it is possible to compare old and new values:

	editor.on( 'notificationUpdate', function( evt ) {
		if( evt.data.options && evt.data.options.message != evt.data.notification.message ) {
			alert( 'Message changed!');
		}
	} );

If you cancel {@link CKEDITOR.editor#notificationHide} it will be hidden, does not matter if duration passed, user press `X` button or `Esc`.

## Notifications Aggregator

If you want to show one notification aggregating many small tasks you can use {@link CKEDITOR.plugins.notificationAggregator notification aggregator}.

{@img notification_aggregator.png Notifications aggregator example}

	// Editor needs the notificationaggregator plugin.
	var editor = CKEDITOR.replace( 'editor1', {
		extraPlugins: 'notificationaggregator'
	} );

	editor.once( 'instanceReady', function() {
		// Create notification aggregator with description template.
		var aggregator = new CKEDITOR.plugins.notificationAggregator( editor, 'Uploading {current} of {max}... {percentage}%' );

		// Create two tasks with different weights and add them to the aggregator.
		var task1 = aggregator.createTask( { weight: 60 } ),
			task2 = aggregator.createTask( { weight: 40 } );

		// Finish first task (100% done of the first task and 60% (=60/(60+40)) of the total).
		task1.done();

		// Update second task (25% (10/40) done of the second task and 70% (=(60+10)/(60+40)) of the total).
		task2.update( 10 );
	} );

It is also possible to create separate template for single item message so if aggregator handles only one task it will not look strange (for example *Loading file.* instead of *Loading files 1 of 1.*).

To learn more about notification aggregator check {@link CKEDITOR.plugins.notificationAggregator} and {@link CKEDITOR.plugins.notificationAggregator.task}.