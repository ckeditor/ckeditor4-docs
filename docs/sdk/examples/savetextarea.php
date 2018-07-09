<!DOCTYPE html>
<?php
/*
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see license.html or https://sdk.ckeditor.com/license.html.
*/
?>
<html>
<head>
	<meta charset="utf-8">
	<title>Saving Data in CKEditor Replacing a Textarea</title>
	<link rel="stylesheet" href="../theme/css/sdk.css">
	<style>
	pre code {
		white-space: pre-wrap;
		word-wrap: break-word;
		color: #000;
	}
	</style>
	<link rel="icon" href="../theme/img/favicon.ico">
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/github.min.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/highlight.min.js"></script>
</head>
<body>
	<section class="sdk-container">
	<section class="sdk-contents">
		<h1>CKEditor &mdash; Data Posted to the Server</h1>

		<p>The following data was submitted with a POST request:</p>
		<table border="1" cellspacing="0" id="outputSample">
		<colgroup>
			<col width="120">
		</colgroup>
		<thead>
		<tr>
			<th>Field Name</th>
			<th>Value</th>
		</tr>
		</thead>
		<?php

		if (!empty($_POST)) {
			foreach ($_POST as $key => $value) {
			if ((!is_string($value) && !is_numeric($value)) || !is_string($key)) {
				continue;
			}

			if (get_magic_quotes_gpc()) {
				$value = htmlspecialchars(stripslashes((string) $value));
			}
			else {
				$value = htmlspecialchars((string) $value);
			}
			?>
			<tr>
				<th style="vertical-align: top"><?php echo htmlspecialchars((string) $key); ?></th>
				<td>
				<pre><code class="html"><?php echo $value; ?></code></pre>
				</td>
			</tr>
			<?php
			}
		}
		?>
		</table>
	</section>
	</section>

	<footer class="sdk-footer">

	</footer>
	<script>
		hljs.highlightBlock( document.querySelector( '.html' ) );
	</script>
</body>
</html>
