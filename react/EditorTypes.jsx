import React from 'react';
import CKEditor from 'ckeditor4-react/dist/ckeditor.js';

const initialData = '<p>This is a CKEditor 4 instance created by ️⚛️ React.</p>';

const EditorTypes = () => (
	<div>
		<h2>Classic WYSIWYG editor</h2>
		<p>
			To use the CKEditor 4 classic editor in React, create a new <code>&lt;CKEditor /&gt;</code> component. The initial data of the editor can be set with the <code>data</code> property.
		</p>
		<CKEditor data={initialData} />
		<h2>Inline WYSIWYG editor</h2>
		<p>
			To use the CKEditor 4 inline editor in React, set the <code>type</code> property of <code>&lt;CKEditor /&gt;</code> to <code>inline</code>.
		</p>
		<CKEditor type="inline" data={initialData} />
	</div>
);

export default EditorTypes;
