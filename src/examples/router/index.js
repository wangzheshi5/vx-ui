import { createRouter, createWebHashHistory } from 'vue-router'
import LayoutIndex from '@/examples/Layout/layout-index.vue'

const initRouter = () =>{
	return createRouter({
		history: createWebHashHistory(),
		routes: [
			{
				path: '/',
				name: '',
				component: LayoutIndex,
				redirect:'/home',
				children:[{
					path: 'home',
					name: '首页',
					component: import('@/examples/views/home/home-index.vue'),
				},{
					path: 'input',
					name: 'input 输入框',
					component: import('@/examples/views/input/input-index.vue'),
				}]
			}
		]
	})
}

const router = initRouter()

export function resetRouter () {
	const newRouter = initRouter()
	router.matcher = newRouter.matcher
}

export default router
