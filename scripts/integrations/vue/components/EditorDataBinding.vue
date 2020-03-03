<template>
	<div>
		<h2>Two-way data binding</h2>
		<p>
			Using the <code>v-model</code> directive, it is possible to create a simple two-way data binding between the CKEditor 4 WYSIWYG editor component and other components, for example the preview component that renders the content of the editor.
		</p>

		<textarea class="source-editor" v-model.lazy="editorData"></textarea>

		<div class="editor-container">
			<ckeditor
				class="editor-instance"
				:config="editorConfig"
				v-model="editorData"
			></ckeditor>

			<div class="editor-preview">
				<h2>Rendered content</h2>
				<div v-html="editorData"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'editor-data-binding',
	data() {
		return {
			editorData: '<p>This is a CKEditor 4 WYSIWYG editor instance created with Vue.</p>',
			editorConfig: {
				toolbar: [
					[ 'Source' ],
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
		}
	}
}
</script>

<style scoped>
.source-editor {
	width: 100%;
}

.editor-container {
	overflow: auto;
}

.editor-instance {
	float: left;
	width: 50%;
}

.editor-preview {
	float: right;
	width: 49%;
	border: 1px solid #d1d1d1;
	padding: 10px;
}

.editor-preview h2 {
	padding-top: 0;
}

@media screen and (max-width: 768px) {
	.editor-preview {
		width: 100%;
	}
}
</style>
