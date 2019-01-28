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
import { SimpleUsageComponent } from './simple-usage/simple-usage.component';
import { DemoFormComponent } from './demo-form/demo-form.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/simple-usage', pathMatch: 'full' },
	{ path: 'simple-usage', component: SimpleUsageComponent },
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
		SimpleUsageComponent
	],
	providers: [],
	bootstrap: [ AppComponent ]
} )

export class AppModule {
}
