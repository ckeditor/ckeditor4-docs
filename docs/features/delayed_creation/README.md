---
category: api-usage
order: 60
url: features/delayed_creation
menu-title: Delayed creation
meta-title-shor: Delayed creation
---
<!--
Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Delayed creation

<info-box info="">This feature was introduced in 4.17.0 and by default it is off. It requires [enabling config option](../api/CKEDITOR_config.html#cfg-delayIfDetached) to worksfor the editor.</info-box>

It was introduced because there were some issues during editor creation on the element that is detached from the DOM. During the entire process, there is some information extracted from the editor elements document. If the target element is detached, it is simply impossible to access them. This situation may be caused unintentionally by using CKEditor 4 with popular frameworks (e.g. [Angular integration](../guide/dev_angular.html)) which may detach elements that are hidden.

## Two ways to delay creation

- Enabling [delayIfDetached option](../api/CKEDITOR_config.html#cfg-delayIfDetached) enabled the default interval checks. A check is performed every [amount of time](../api/CKEDITOR_config.html#cfg-delayIfDetached_interval). Whenever a target element is found to be attached to the DOM - the new instance of the editor is created. This is the easiest and fastest way to use this feature. It may be not so efficient to have a running interval operation in the background. There is also a second, more efficient method of usage.

- Additional setting [callback](../api/CKEDITOR_config.html#cfg-delayIfDetached_callback) will turn off the default interval checks. Instead, the callback is invoked with a single argument. This argument is a function that should be invoked to finish editor creation. The advantage here is that it gives full control over the time that the actual creation is performed. A received callback may be stored and used right after attached the target element to the DOM.

## Practical example

Let's have a target element and it is not visible by the user (is detached), but the editor creation was called.

Whenever user clicks the button: The element is visible again.

With the interval checks, depends on the use case, the script may run for so long until the first button use. In the worst case, the button may not be clicked at all. Also, last check may happen milliseconds before user clicks. The default timeout is small enough, that there will be no flickering effect, but still, we need to wait that amount of time and then the creation time.

With the callback option, we may store the received creation function. Bind to the button onclick and invoke the stored function. Now we need to wait only for creation time. No additional delays or unnecessary checks. However, additional logic needs to be implemented and binded to every place that could show the editor.