<template>
	<div>
		<h2>Classic WYSIWYG editor</h2>
		<p>
			To use the CKEditor 4 <a href="./classic.html">classic editor</a> in Vue, create a new <code>&lt;ckeditor /&gt;</code> component. The initial data of the editor can be set with the <code>value</code> directive.
		</p>
		<ckeditor :value="editorData" />
		<h2>Inline WYSIWYG editor</h2>
		<p>
			To use the CKEditor 4 <a href="./inline.html">inline editor</a> in Vue, set the <code>type</code> directive of <code>&lt;ckeditor /&gt;</code> to <code>inline</code>.
		</p>
		<ckeditor type="inline" :value="editorData" :config="editorConfig" />
	</div>
</template>

<script>
export default {
	name: 'editor-types',
	data() {
		return {
			editorData: '<p>This is a CKEditor 4 WYSIWYG editor instance created with ️Vue.</p>',
			editorConfig: {
				extraPlugins: 'sourcedialog'
			}
		}
	}
}
</script>

<style>
.cke_editable_inline {
	border: 1px solid #d1d1d1;
	padding-left: 10px;
	padding-top: 10px;
}

.cke_editable_inline:not(.cke_focus) {
	cursor: pointer;
}

.cke_editable_inline:hover:not(.cke_focus) {
	outline: #2ba2f1 auto 5px;
}
</style>
