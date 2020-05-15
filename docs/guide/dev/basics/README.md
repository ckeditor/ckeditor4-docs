---
category: getting-started
order: 40
url: guide/dev_basics
menu-title: Basic CKEditor 4 Concepts
meta-title-short: Basic CKEditor 4 Concepts
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Basic CKEditor 4 Concepts

This article aims to answer two simple questions:

* What CKEditor 4 is (and what I can use it for)?

* What CKEditor 4 is not (and why it will be of no use to me)?

Additionally, it also explains briefly how CKEditor 4 works and why it needs to get clean, standards-compliant code as input.

## What CKEditor 4 Is

**CKEditor 4 is an online WYSIWYG editor that is used to edit HTML documents (or their fragments) in the browser.**

So what does this mean?

* The *"online"* part means that CKEditor 4 **works in a web browser** (like Firefox, Chrome, Internet Explorer or Safari). It is thus not a standalone program that can be installed on your computer and then opened as a desktop application.

* The *"WYSIWYG"* part means that when you use CKEditor 4, you can **style the text and add rich media contents to your document in real time by using the editor UI** (toolbar buttons, dialog windows), and the result will be seen immediately. If you click the **Bold** button, the text will become bold; when you add an image, it will appear straightaway.

* **CKEditor 4 works on HTML**, which is a markup language used to create web content. The huge benefit that CKEditor 4 gives you, however, is that you do not need to see the HTML code directly nor understand its intricacies. The editor is sort of an intermediary here &mdash; it hides the HTML code from you and lets you just work the WYSIWYG way.

* The *"edit HTML documents"* part means that the **editor can be used to edit any HTML content**, like website content (blog articles, blog comments, forum posts), e-mails, or things that you write in web forms. That is not all, however: CKEditor 4 can also be used in all sorts of online applications, i.e. all those that use HTML as their source text format and are run in the browser!

## What CKEditor 4 Is Not

There are a few scenarios where CKEditor 4 seems to be just the tool that you need while in fact this is not the case. For example:

* CKEditor 4 is neither a **graphical web design tool** nor a website builder. If you want a tool that will help you design your website, CKEditor 4 is not what you are looking for.

* CKEditor 4 is not a **content management system (CMS)**. It does not contain any sort of database to store your posts, logging system for user management, or administration panel where you can tweak the options for your website.

* CKEditor 4 is not **desktop publishing software** (it is not MS Word!) and is not a recommended tool to use when creating paged content with fixed layout and styling that is intended for printing.

* CKEditor 4 working out of the box in its default implementation is **not a tool like Google Docs**, where multiple users can edit the same article online in real time, track changes, and add comments. However, **if you need those features we have a good news for you - all of those are available in [CKEditor 5](https://ckeditor.com/docs/ckeditor5/latest/features/index.html)!**.

* CKEditor 4 is not a tool that will let you input invalid HTML code. CKEditor abides by W3C standards so it will modify code if it is invalid.

At the end of the day, **CKEditor 4 is an editor &mdash; nothing more, nothing less**. Go to the {@linkexample index CKEditor 4 Examples} section to see plenty of valid editor use cases, with source code ready to copy and implement in your own solution!

## How CKEditor 4 Works

Web content is created in HTML, a markup language that includes both text and special tags that describe this text as well as add semantic meaning to it. These tags are used to mark particular content elements as "headings", "paragraphs", "bold text", etc. CKEditor 4 merely hides the HTML tags from the user and shows their equivalents in the graphical user interface (like the Bold toolbar button) as well as outputs the text with formatting already applied.

This has some consequences, though. **CKEditor 4 works on HTML code and to do it well, it needs to get proper HTML code as input.** If the source document is incorrect, CKEditor 4 will attempt to fix it in order to be able to apply its content transformations.

CKEditor 4 is not a human-being, though, so it is unable to guess your intentions when you created incorrect HTML code which may lead to some unexpected consequences. In order to avoid problems the input provider (you!) needs to make sure that what CKEditor 4 gets is clean, standards-compliant HTML code. If this is the case, CKEditor 4 will work as intended and output clean, standards-compliant HTML code in return.
