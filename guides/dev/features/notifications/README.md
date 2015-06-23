<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Notifications

Since version 4.5 CKEditor use notification to show user information about the operations status in the editor. Notifications let you show informations in the consistent way, this means all plugins using notifications API will show informations the same way. This API let you also show notifications in the default way or integrate editors notifications with the website or CMS notifications. Note that notifications do not work with dialogs so no dialog should be displayed when the notifications is to be shown.

There are multiple types of notifications. To learn more check CKEDITOR.plugins.notification-property-type.

{@img notification.png Inline Notifications example}

To show simple notification you need to create `notification` instance and call `show` method or you can use `showNotification` shortcut:

	// Editor needs `notification` plugin.
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

		// Do the same, just an shortcut.
		var notification2 = editor.showNotification( 'Error occurred', 'warning' );
	} );

Note that `[showNotification](#!/api/CKEDITOR.editor-method-showNotification)` method is available even without the the notification plugin. Then the alert will be shown instead of notification.

Once you create a notification you can update its state and even change its type:

	var notification = editor.showNotification( 'Uploading...', 'progress', 0.25 );

	// ...

	notification.update( { progress: 0.75 } );

	// ...

	notification.update( { type: 'success', message: 'File uploaded.' } );

Note that someone may implement the notification interface in the custom way, for example show notification with the slide-in the animation. Then updating one notification is not the same as hiding one and showing another. One notification should show the status of one process so it is better to updated it to the `success` type instead of creating new one.

To learn more about notifications API check CKEDITOR.plugins.notification documentation.

## Notification interface

By default notifications are shown at the top center of the editable area. However, they try to be visible as long as possible not leaving editable area. It means that notifications will move if part of the editable will be out of the viewport, so you can edit very long document and notification will still be visible. They also move below toolbar if you are using floating toolbar, but they will be not visible at all if the whole editor will not be visible:

{@img notification_stick.png Notifications sticks to the viewport border to be visible as long as possible}

Notifications can also hide after the timeout. By default `info` and `success` notifications hide after 5 seconds what can be changed using `CKEDITOR.config.notification_duration`. `warning` notification needs to be hidden manually. `progres` notifications also are not hidden automatically. They wait for the next progress update and to be finally changed to `success` or `warning`. It is also possible to change the notification duration per instance.

User can also hide notifications manually: using `X` button or `Esc` key.

If you want to make sure that notification will be shown after the update that update needs be marked as
[important](#!/api/CKEDITOR.plugins.notification-method-update). This is also important because of the accessibility reason: important updates will be read by screen reader and rest of the updates will not, because we do not want to spam user with tons of messages if the notification is updated very often.

## Notification integration

If you want to replace standard notification interface with the custom one or you want to integrate editors notifications with the page/CMS notifications you can do it listening notification events: `notificationShow`, `notificationUpdated` and `notificationHide`.

To prevent notifications to be shown it is not enough to prevent `notificationShow` but you need too cancel `notificationUpdate` too, otherwise important update will display the notification.

	editor.on( 'notificationShow', function( evt ) {
		alert( evt.data.notification.message );

		// Do not show the default notification.
		evt.cancel();
	} );

	editor.on( 'notificationUpdate', function( evt ) {
		// Do not show the notification even if update was important.
		evt.cancel();
	} );

Note that if you cancel `notificationUpdate` event it means only that the notification will not be shown even if the updated was important. Notification object will be updated anyway, including `element` property, so you do not need to do it manually. The event is fired before updating notifications object so it is possible to compare old and new values:

	editor.on( 'notificationUpdate', function( evt ) {
		if( evt.data.options && evt.data.options.message != evt.data.notification.message ) {
			alert( 'Message changed!');
		}
	} );

If you cancel `notificationHide` it will be hidden, does not matter if duration passed, user press `X` button or `Esc`.

## Notifications aggregator

If you want to show one notification aggregating many small tasks you can use notifications aggregator.

{@img notification_aggregator.png Notifications aggregator example}

	// Editor needs `notificationaggregator` plugin.
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

		// Update second task (25% (10/40) done of the second task  and 70% (=(60+10)/(60+40)) of the total).
		task2.update( 10 );
	} );

It is also possible to create separate template for single item message so if aggregator handle only one task it will not looks strange (for example 'Loaidng file.' instead of 'Loading files 1 of 1.').

See CKEDITOR.plugins.notificationAggregator and http://docs.ckeditor.dev/#!/api/CKEDITOR.plugins.notificationAggregator.task.