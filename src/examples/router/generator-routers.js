// import consoleLayout from '@/layouts/console-layout.vue'

import { apiFetchAuths } from '@/api/role.js'

const pageModules = import.meta.glob('../views/**/*.vue')
const layoutModules = import.meta.glob('../layouts/**/*.vue')

const consoleBasicRouter = {
	path: '/console',
	code: 'console',
	name: '首页',
	component: '../layouts/console-layout.vue',
	meta: {
		title: '首页',
		type: 'C'
	},
	children: []
}

const notFoundPage = {
	path: '/:pathMath(.*)*',
	redirect: '/exception/notfound'
}

// 前端路由表
const constantRouterComponentsMap = {
}

/**
 * 动态生成菜单 通过http请求 拿到权限和对应能访问的url
 * @param token
 * @returns {Promise<Router>}
 */
// eslint-disable-next-line no-unused-vars
export const generatorDynamicRouter = () => {
	return new Promise((resolve, reject) => {
		apiFetchAuths({
			type: 'A1'
		}).then(res=>{
			let { data, resCode, resMsg } = res
			if(resCode === '000000'){

				consoleBasicRouter.component = layoutModules[consoleBasicRouter.component]

				let routers = generator(data)
				
				consoleBasicRouter.children = routers

				let addRouters = [consoleBasicRouter, notFoundPage]

				resolve({
					addRouters
				})


				return false
			}

			reject(resMsg)
		}).catch(error=>{
			reject(error)
		})
	})
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = routerMap => {
	// parent
	let tempMenus = []

	routerMap.forEach(item => {
		if((!item.code && !item.path) || item.visible === 0) return false

		if(item.menuType === 'F') return false

		if(!item.component){
			item.component = '@/views/exception/not-open-page.vue'
		}

		item.component = item.component.replace('@','..')
		// const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
		const currentRouter = {
			// 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
			// path: item.path || `${(parent && parent.path) || ''}/${item.code}`,
			path: item.path || item.code,
			label: item.name,
			// 路由名称，建议唯一
			name: item.code,
			// 该路由对应页面的 组件 :方案1
			// component: constantRouterComponentsMap[item.component || item.key],
			// 该路由对应页面的 组件 :方案2 (动态加载)

			// component: constantRouterComponentsMap[item.component || item.key] || (() => import(`@/views/${item.component}`)),
			component: constantRouterComponentsMap[item.component || item.key] || pageModules[`${item.component}`] || layoutModules[`${item.component}`],

			// meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
			meta: {
				title: item.name,
				type: item.menuType
				// icon: icon || undefined,
				// hiddenHeaderContent,
				// target,
				// permission: item.name
			},
			sort: item.sort,
			icon: item.icon
		}
		// 是否设置了隐藏菜单
		// if (show === false) {
		// 	currentRouter.hidden = true
		// }
		// // 是否设置了隐藏子菜单
		// if (hideChildren) {
		// 	currentRouter.hideChildrenInMenu = true
		// }
		// 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
		// if (!currentRouter.path.startsWith('http')) {
		// 	currentRouter.path = currentRouter.path.replace('//', '/')
		// }
		// 重定向
		item.redirect && (currentRouter.redirect = item.redirect)
		// 是否有子菜单，并递归处理
		if (item.children && item.children.length > 0) {
			// Recursion
			currentRouter.children = generator(item.children, currentRouter)
			
			currentRouter.children.length > 0 && currentRouter.children.sort((a, b)=>{
				return a.sort - b.sort
			})
		}

		tempMenus.push(currentRouter)
	})

	return tempMenus
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
// eslint-disable-next-line no-unused-vars
const listToTree = (list, tree, parentId) => {
	list.forEach(item => {
		// 判断是否为父级菜单
		if (item.parentId === parentId) {
			const child = {
				...item,
				key: item.key || item.name,
				children: []
			}
			// 迭代 list， 找到当前菜单相符合的所有子菜单
			listToTree(list, child.children, item.id)
			// 删掉不存在 children 值的属性
			if (child.children.length <= 0) {
				delete child.children
			}
			// 加入到树中
			tree.push(child)
		}
	})
}
export const addRoutes = (router, routers, parentName) => {
	routers.forEach(item=>{
		if(parentName){
			router.addRoute(parentName, item)
		}else{
			
			router.addRoute(item)
		}

		if(item.children && item.children.length > 0){
			addRoutes(router, item.children, item.name)
		}
	})
	
}