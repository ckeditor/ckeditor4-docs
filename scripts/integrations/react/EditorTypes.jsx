import React from 'react';
import { CKEditor } from 'ckeditor4-react';

const initData = <p>This is a CKEditor 4 WYSIWYG editor instance created by ️⚛️ React.</p>;
const editorConfig = {
	extraPlugins: 'sourcedialog'
};

const EditorTypes = () => (
	<div>
		<h2>Classic WYSIWYG editor</h2>
		<p>
			To use the CKEditor 4 <a href="./classic.html">classic editor</a> in React, create a new <code>&lt;CKEditor /&gt;</code> component. The initial data of the editor can be set with the <code>initData</code> property.
		</p>
		<CKEditor initData={initData} />
		<h2>Inline WYSIWYG editor</h2>
		<p>
			To use the CKEditor 4 <a href="./inline.html">inline editor</a> in React, set the <code>type</code> property of <code>&lt;CKEditor /&gt;</code> to <code>inline</code>.
		</p>
		<CKEditor type="inline" initData={initData} config={editorConfig} />
	</div>
);

export default EditorTypes;
