import Vue from 'vue';
import VueRouter from 'vue-router';
import CKEditor from 'ckeditor4-vue/dist/legacy.js';

import App from './App.vue';
import routes from './routes';

Vue.config.productionTip = false;

Vue.use( CKEditor );
Vue.use( VueRouter );

const router = new VueRouter( { routes } );

new Vue( {
	render: h => h(App),
	router
} ).$mount( '#app' );
