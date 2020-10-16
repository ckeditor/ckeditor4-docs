<template>
	<div>
		<h2>WYSIWYG editor with custom event handlers and configuration</h2>
		<p>
			Editors created with the CKEditior 4 Vue component are highly customizable. It is possible to overwrite every configuration setting using the <code>config</code> directive and passing an object containing the configuration to it.
		</p>
		<p>
			Additionally, the CKEditor 4 WYSIWYG editor component for Vue allows you to bind predefined component events using <code>v-on</code> or <code>@</code> modifiers. The following example shows how to bind several common CKEditor 4 events and apply custom toolbar configuration.
		</p>

		<ckeditor
			@ready="logEvent('ready', $event)"
			@focus="logEvent('focus', $event)"
			@blur="logEvent('blur', $event)"
			@input="logEvent('input', $event)"

			:config="editorConfig"
			:value="editorData"
		></ckeditor>

		<section>
			<h3>Events log</h3>
			<small>To check additional details about every event, consult the console in the browser developer tools.</small>
			<div class="event-log">
				<ul>
					<li v-for="event of events">
						{{ event.timestamp }} - {{ event.name }}
					</li>
				</ul>
			</div>
			<button v-on:click="clearEventsLog()">Clear events log</button>
		</section>
	</div>
</template>

<script>
export default {
	name: 'editor-configuration',
	data: function() {
		return {
			events: [],
			editorData: 'This is a CKEditor 4 WYSIWYG editor instance created with Vue.',
			editorConfig: {
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
			}
		};
	},
	methods: {
		logEvent: function( eventName, event ) {
			if ( this.events.length > 19 ) {
				this.events.pop();
			}

			const eventData = {
				name: eventName,
				timestamp: this.getCurrentTimestamp()
			}

			this.events.unshift( eventData );

			console.log( eventData.timestamp, eventData.name, event );
		},

		getCurrentTimestamp: function() {
			return new Intl.DateTimeFormat( 'en', {
				hour12: false,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			} ).format( new Date() );
		},

		clearEventsLog: function() {
			this.events = [];
		}
	}
}
</script>

<style scoped>
.event-log {
	font-family: "SF Mono",menlo,monaco,"Roboto Mono",Consolas,"Lucida Console",monospace;
	font-size: .866666em;
	padding: 1.333em;
	background: #2b2c26;
	color: #fff;
	margin-bottom: 10px;
}

.event-log > ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
	max-height: 200px;
	overflow: auto;
}
</style>
