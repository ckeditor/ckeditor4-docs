---
category: licensing
order: 30
menu-title: License key and activation
---

# License key and activation

This article explains how to activate a license of CKEditor 4 LTS ("Long Term Support") under commercial terms (["Extended Support Model"](https://ckeditor.com/ckeditor-4-support/)).

## Purchasing a commercial license

To activate CKEditor 4 LTS ("Long Term Support"), you will need a paid [Extended Support Model](https://ckeditor.com/ckeditor-4-support/) that will protect you against security vulnerabilities and/or breaking third-party API changes.

If you wish to purchase a commercial CKEditor 4 LTS license, [contact us](https://ckeditor.com/contact/?sales=true#contact-form) to receive an offer tailored to your needs.

## Obtaining a license key

Follow this guide to get the license key necessary to activate the CKEditor 4 LTS ("Long Term Support") version, guaranteeing that your editor remains secure.

### Log in to the CKEditor Ecosystem dashboard

Log in to the [CKEditor Ecosystem dashboard](https://dashboard.ckeditor.com). If this is the very first time you do it, you will receive a confirmation email and will be asked to create a password for your account. Keep it safe.

### Access the account dashboard

After logging in, click "CKEditor" under the "Your products" header on the left. You will see the overview of the subscription parameters together with the management area below.

{@img assets/img/ckeditor-dashboard.png 832 Your CKEditor subscriptions in the customer dashboard.}

### Copy the license key

After clicking "Manage", you can access the license key needed to run the editor under the LTS version.

{@img assets/img/ckeditor-key.png 797 License key in the management console.}

## Activating the product

You need to add the license key to your CKEditor 4 configuration.

```js
CKEDITOR.replace( 'editor', {
    // Provide the activation key.
    licenseKey: 'your-license-key',
} );
```
