import React from 'react';
import CKEditor from 'ckeditor4-react/dist/ckeditor.js';

const initialData = '<p>This is a CKEditor 4 instance created by ️⚛️ React.</p>';

const EditorTypes = () => (
	<div>
		<h2>Classic WYSIWYG editor</h2>
		<p>
			The basic use of the WYSIWYG editor component is as simple as creating a new <code>&lt;CKEditor /&gt;</code> component. The initial data of the editor can be set via the <code>data</code> property.
		</p>
		<CKEditor data={initialData} />
		<h2>Inline WYSIWYG editor</h2>
		<p>
			To use inline WYSIWYG editor, set the <code>type</code> property to <code>inline</code>. In the following example inline editor is created.
		</p>
		<CKEditor type="inline" data={initialData} />
	</div>
);

export default EditorTypes;
