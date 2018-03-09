---
category: integration
order: 40
url: guide/dev_cloudservices
menu-title: CKEditor Cloud Services
meta-title-short: CKEditor Cloud Services
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor Cloud Services Integration

<info-box info="">
    This feature was introduced in <strong>CKEditor 4.9</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the [Download](https://ckeditor.com/ckeditor-4/download/) site and {@link guide/dev/plugins/README needs to be added to your custom build} with [CKBuilder](https://ckeditor.com/cke4/builder).
</info-box>

The optional [Cloud Services plugin](https://ckeditor.com/cke4/addon/cloudservices) allows to integrate CKEditor 4 instances with [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services/), including the {@link guide/dev/features/easyimage/README Easy Image} upload backend.

The plugin exports {@linkapi CKEDITOR.plugins.cloudservices.cloudServicesLoader} &mdash; a class that can be used as a custom upload handler, for example replacing the one implemented in the [Upload Image](https://ckeditor.com/cke4/addon/uploadimage) plugin. It is also the default file loader used in the [Easy Image](https://ckeditor.com/cke4/addon/easyimage) plugin.

CKEditor Cloud Services requires two configuration options to be set:

* {@linkapi CKEDITOR.config.cloudServices_uploadUrl} &ndash; The URL to the cloud services upload endpoint. Please refer to the [official CKEditor Cloud Services documentation about endpoints](https://docs.ckeditor.com/cs/latest/guides/token-endpoints/tokenendpoint.html) for more information.
* {@linkapi CKEDITOR.config.cloudServices_tokenUrl} &ndash; The URL to the Cloud Services token generation endpoint, unique to your CKEditor Cloud Services account. Generated authorization token is needed to use the upload endpoint.

For further information about CKEditor Cloud Services integration, please refer to the official [CKEditor Cloud Services documentation](https://docs.ckeditor.com/cs/latest/index.html).

## Related Features

Refer to the following resources for more information about Easy Image:

* {@link guide/dev/features/easyimage/README Easy Image} lets you insert images which are automatically rescaled, optimized, responsive and delivered through a blazing-fast CDN.
* {@link guide/dev/integration/easyimage_integration/README Easy Image Integration} explains how to enable the cloud services provider for Easy Image as well as how to customize some of its features.
