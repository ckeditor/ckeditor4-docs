/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
let banner = document.createElement("div");
banner.classList.add("main__content-inner");
banner.innerHTML = '<div class="info-box notice notice__warning"><strong>CKEditor 4 reached its End of Life (EOL) in June 2023.</strong> From then on, it will receive no more updates, new features, bug fixes, and security patches. Visit <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">CKEditor 5 Docs</a> for the actively supported CKEditor or check <a href="https://ckeditor.com/docs/ckeditor4/latest/support/licensing/extended-support-model.html">Extended Support Model</a>.</div>';

document.querySelector('.main__content').prepend(banner);
