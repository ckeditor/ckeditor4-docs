/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { CKEditorModule } from '@ckeditor/ckeditor4-angular';
import { EditorTypesComponent } from './editor-types/editor-types.component';
import { EventsComponent } from './events/events.component';
import { DemoFormComponent } from './demo-form/demo-form.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/editor-types', pathMatch: 'full' },
	{ path: 'editor-types', component: EditorTypesComponent },
	{ path: 'events', component: EventsComponent },
	{ path: 'forms', component: DemoFormComponent }
];

@NgModule( {
	imports: [
		BrowserModule,
		FormsModule,
		CKEditorModule,
		RouterModule.forRoot( appRoutes, { useHash: true } )
	],
	declarations: [
		AppComponent,
		DemoFormComponent,
		EditorTypesComponent,
		EventsComponent
	],
	providers: [],
	bootstrap: [ AppComponent ]
} )

export class AppModule {
}
