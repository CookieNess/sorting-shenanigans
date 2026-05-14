import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlgorithmView from '../views/AlgorithmView.vue'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', component: HomeView },
		{ path: '/algorithm/:id', component: AlgorithmView, props: true },
	],
	scrollBehavior: () => ({ top: 0 }),
})

export default router
