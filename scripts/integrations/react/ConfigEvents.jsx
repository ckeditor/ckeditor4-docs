import React from 'react';
import { CKEditor } from 'ckeditor4-react';

const { useState } = React;

const ConfigEvents = () => {
	const [ events, setEvents ] = useState( [] );

	const logEvent = ( evt ) => {
		evt.timestamp = new Intl.DateTimeFormat( 'en', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		} ).format( new Date() );

		console.log( evt.timestamp, evt.name, evt.data || 'No additional data was provided' );

		setEvents( events =>  [ evt, ...events ] );
	}

	const clearEvents = () => {
		setEvents( [] );
	}

	return (
		<div>
			<h2>WYSIWYG editor with custom event handlers and configuration</h2>
			<p>
				Editors created with the CKEditior 4 React component are highly customizable. It is possible to overwrite every configuration setting using the <code>config</code> property and passing an object containing the configuration to it.
			</p>
			<p>
				Additionally, the CKEditor 4 WYSIWYG editor component for React allows you to bind any event handler using properties with names starting with <code>on</code>, followed by the name of the event with the first letter capitalized. The following example shows how to bind several common CKEditor 4 events and apply custom toolbar configuration.
			</p>
			<CKEditor
				initData="This is a CKEditor 4 WYSIWYG editor instance created by ️⚛️ React."
				config={{
					toolbar: [
						[ 'Source' ],
						[ 'Styles', 'Format', 'Font', 'FontSize' ],
						[ 'Bold', 'Italic' ],
						[ 'Undo', 'Redo' ],
						[ 'EasyImageUpload' ],
						[ 'About' ]
					],
					extraPlugins: 'easyimage',
					removePlugins: 'image',
					cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
					cloudServices_tokenUrl:
						'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
				}}
				onFocus={logEvent}
				onBlur={logEvent}
				onChange={logEvent}
				onSelectionChange={logEvent}
			/>
			<h3>Events Log</h3>
			<small>To check additional details about every event, consult the console in the browser developer tools.</small>
			<EventLog stream={events} />
			<button onClick={clearEvents}>Clear events log</button>
		</div>
	);
}

const EventLog = ( { stream } ) => {
	return (
		<div className="event-log">
			<ul className="event-log__events">
				{
					stream.map( event => {
						return (
							<li className="event-log__event">
								<Event data={event} />
							</li>
						)
					} )
				}
			</ul>
		</div>
	);
}

const Event = ( { data: { name, timestamp } } ) => {
	return (
		<>
			{timestamp} – {name}
		</>
	);
}

export default ConfigEvents;
