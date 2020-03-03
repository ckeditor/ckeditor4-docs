import EditorTypes from './components/EditorTypes.vue';
import EditorConfiguration from './components/EditorConfiguration.vue';
import EditorDataBinding from './components/EditorDataBinding.vue';

const routes = [
	{
		path: '/',
		component: EditorTypes
	},
	{
		path: '/configuration',
		component: EditorConfiguration
	},
	{
		path: '/2-way-binding',
		component: EditorDataBinding
	}
];

export default routes;
