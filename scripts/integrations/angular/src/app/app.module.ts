/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { CKEditorModule } from 'ckeditor4-angular';
import { EditorTypesComponent } from './editor-types/editor-types.component';
import { EventsComponent } from './events/events.component';
import { EditorBindingComponent } from './binding/editor-binding.component';

const appRoutes: Routes = [
	{ path: '', component: EditorTypesComponent, pathMatch: 'full' },
	{ path: 'configuration', component: EventsComponent },
	{ path: '2-way-binding', component: EditorBindingComponent }
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
		EditorBindingComponent,
		EditorTypesComponent,
		EventsComponent
	],
	providers: [],
	bootstrap: [ AppComponent ]
} )

export class AppModule {
}
