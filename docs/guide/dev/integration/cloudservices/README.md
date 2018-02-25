---
category: integration
order: 40
url: guide/dev_cloudservices
menu-title: Cloud Services
meta-title-short: Cloud Services
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Cloud Services Integration

[Cloud Services](https://ckeditor.com/cke4/addon/cloudservices) plugin allows to integrate CKEditor 4 instances with [Cloud Services](https://ckeditor.com/ckeditor-cloud-services/), e.g. Easy Image upload backend. It exports {@linkapi CKEDITOR.plugins.cloudservices.cloudServicesLoader} – class that could be used as a custom file loader in upload widgets, e.g. one implemented as [Upload Image](https://ckeditor.com/cke4/addon/uploadimage) plugin. It's also a default file loader used in [Easy Image](https://ckeditor.com/cke4/addon/easyimage) plugin.

Cloud Services needs to be configured before use. It can be done by modifying two config options:

*   `cloudServices_url` – URL to Cloud Services upload endpoint; please refer to [official Cloud Services documentation about endpoints](https://docs.ckeditor.com/cs/latest/guides/token-endpoints/tokenendpoint.html).
*   `cloudServices_token` – authorization token needed to use upload endpoint.

For further information about Cloud Services integration, please refer to official [Cloud Services documentation](https://docs.ckeditor.com/cs/latest/index.html).
