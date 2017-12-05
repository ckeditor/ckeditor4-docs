<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Notifications

<p class="requirements">
	This feature was introduced in <strong>CKEditor 4.5</strong>. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and <a href="#!/guide/dev_plugins">need to be added to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

The optional [Notification](https://ckeditor.com/cke4/addon/notification) and [Notification Aggregator](https://ckeditor.com/cke4/addon/notificationaggregator) plugins introduced in CKEditor 4.5 make it possible to show the user information about the status of selected operations directly in the editor.

The new notification system lets you display all sorts of information in a consistent way because all plugins using the {@link CKEDITOR.plugins.notification notification API} will show information in the same way. This API also allows you to integrate the editor's notifications with your website (your CMS for example). Note that notifications do not work with dialog windows so no dialog should be displayed when the notification is to be shown.

There are {@link CKEDITOR.plugins.notification#type four types of notifications} available:

* `info` (default) &ndash; Information for the user (e.g. "File is uploading.", "ACF modified content.").
* `warning` &ndash; A warning or an error message (e.g. "This type of file is not supported.", "You cannot paste the script."),
* `success` &ndash; Information about an operation that finished successfully (e.g. "File uploaded.", "Data imported.").
* `progress` &ndash; Information about the progress of an operation. When the operation is done, the notification type should be changed to `success`.

The image below shows an example of a success and a progress notification.

{@img notification.png Notifications example}

## Showing a Notification

To show a simple notification you need to {@link CKEDITOR.plugins.notification#constructor create a notification} instance and call the {@link CKEDITOR.plugins.notification#show} method or you can use the {@link CKEDITOR.editor#showNotification} shortcut:

	// The editor needs the "notification" plugin.
	var editor = CKEDITOR.replace( 'editor1', {
		extraPlugins: 'notification'
	} );

	editor.once( 'instanceReady', function() {
		// Create and show the notification.
		var notification1 = new CKEDITOR.plugins.notification( editor, {
			message: 'Error occurred',
			type: 'warning'
		} );
		notification1.show();

		// Use shortcut - it has the same result as above.
		var notification2 = editor.showNotification( 'Error occurred', 'warning' );
	} );

Note that the {@link CKEDITOR.editor#showNotification} method is available even without the Notification plugin. In such case an alert will be shown instead of the notification.

Once you create a notification you can update its state and even change its type:

	var notification = editor.showNotification( 'Uploading...', 'progress', 0.25 );

	// ...

	notification.update( { progress: 0.75 } );

	// ...

	notification.update( { type: 'success', message: 'File uploaded.' } );

Note that a developer may implement the notification interface in a custom way, for example to show the notification with a slide-in animation. In such case updating one notification is not the same as hiding one and showing another. One notification should show the status of one process, so it is better to update it to the `success` type instead of creating a new one every time the status changes.

To learn more about the notification API, check the {@link CKEDITOR.plugins.notification} documentation.

## Notification Interface

By default notifications are displayed at the top center of the editable area. However, they try to be visible as long as possible without leaving the editable area. It means that notifications will move if a part of the editable will be out of the viewport, so you can edit a very long document and the notification will still be visible. The notifications also move below the toolbar if you are using the [floating user interface](#!/guide/dev_uitypes-section-floating-user-interface), but they will not be visible at all if the editor is not visible at all.

{@img notification_stick.png Notifications stick to the viewport border to be visible as long as possible}

Notifications can also hide after a timeout.

* By default, `info` and `success` notifications hide after 5 seconds &mdash; this can be changed using the {@link CKEDITOR.config#notification_duration} option. The notification duration can also be changed on an instance basis.
* The `warning` notifications need to be hidden manually.
* The `progress` notifications are also not hidden automatically. They wait for the next progress update and to be finally changed to `success` or `warning`.

The user can always hide notifications manually by using the `X` button or the <kbd>Esc</kbd> key.

If you want to make sure that a notification will be shown after an update, that update needs to be marked as
{@link CKEDITOR.plugins.notification#update important}. This matters also with regard to accessibility &mdash; important updates will be read by screen readers while the rest of the updates will not, because we do not want to spam the user with tons of messages if a notification is updated very often.

## Notification Integration

If you want to replace the standard notification interface with a custom one or you want to integrate editor notifications with your website or CMS, you can do it by listening to notification events: {@link CKEDITOR.editor#notificationShow notificationShow}, {@link CKEDITOR.editor#notificationUpdate notificationUpdate} and {@link CKEDITOR.editor#notificationHide notificationHide}.

To prevent notifications from being shown it is not enough to prevent {@link CKEDITOR.editor#notificationShow}, but you need to cancel {@link CKEDITOR.editor#notificationUpdate} too, otherwise important updates will display the notification.

	editor.on( 'notificationShow', function( evt ) {
		alert( evt.data.notification.message );

		// Do not show the default notification.
		evt.cancel();
	} );

	editor.on( 'notificationUpdate', function( evt ) {
		// Do not show the notification even if the update was important.
		evt.cancel();
	} );

Note that if you cancel the {@link CKEDITOR.editor#notificationUpdate} event, it only means that the notification will not be shown even if the update was important. The notification object will be updated anyway, including the {@link CKEDITOR.plugins.notification#element} property, so you do not need to do it manually. The event is fired before updating the notification object, so it is possible to compare old and new values:

	editor.on( 'notificationUpdate', function( evt ) {
		if( evt.data.options && evt.data.options.message != evt.data.notification.message ) {
			alert( 'Message changed!');
		}
	} );

If you cancel the {@link CKEDITOR.editor#notificationHide} event, the notification will not be hidden. In this case it will not matter whether the defined notification duration passed or the user pressed the `X` button or <kbd>Esc</kbd>.

## Notification Aggregator

If you want to show one notification aggregating many small tasks, you can use the {@link CKEDITOR.plugins.notificationAggregator notification aggregator}.

{@img notification_aggregator.png Notifications aggregator example}

	// The editor needs the "notificationaggregator" plugin.
	var editor = CKEDITOR.replace( 'editor1', {
		extraPlugins: 'notificationaggregator'
	} );

	editor.once( 'instanceReady', function() {
		// Create a notification aggregator with the description template.
		var aggregator = new CKEDITOR.plugins.notificationAggregator( editor, 'Uploading {current} of {max}... {percentage}%' );

		// Create two tasks with different weights and add them to the aggregator.
		var task1 = aggregator.createTask( { weight: 60 } ),
			task2 = aggregator.createTask( { weight: 40 } );

		// Finish the first task (100% done of the first task and 60% (=60/(60+40)) of the total).
		task1.done();

		// Update the second task (25% (10/40) done of the second task and 70% (=(60+10)/(60+40)) of the total).
		task2.update( 10 );
	} );

It is also possible to create a separate template for a single item message, so that it would not look strange if the aggregator was handling only one task (for example: *Loading file.* instead of *Loading files 1 of 1.*).

To learn more about the notification aggregator check {@link CKEDITOR.plugins.notificationAggregator} and {@link CKEDITOR.plugins.notificationAggregator.task}.
