import React from 'react';
import CKEditor from 'ckeditor4-react/dist/ckeditor.js';
import Code from './Code.jsx';

const initialData = '<p>This is an example CKEditor 4 instance.</p>';

const EditorTypes = () => (
	<div>
		<h2>Classic editor</h2>
		<p>
			The basic use of the editor component is as simple as creating new <code>&lt;CKEditor /&gt;</code> component. The initial data of the editor can be set via <code>data</code> prop.
		</p>
		<CKEditor data={initialData} />
		<h2>Inline editor</h2>
		<p>
			To change the type of created editor, <code>type</code> prop can be used. In the following example inline editor is created.
		</p>
		<CKEditor type="inline" data={initialData} />

		<Code id="1">
			{`	<CKEditor data="<p>This is an example CKEditor 4 instance.</p>" />`}
		</Code>
		<Code id="2">
			{`	<CKEditor type="inline" data="<p>This is an example CKEditor 4 instance.</p>" />`}
		</Code>
	</div>
);

export default EditorTypes;
