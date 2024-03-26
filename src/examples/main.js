import { createApp } from 'vue'
import App from './App.vue'
//VxUI为自定义组件库名称
import VxUI from "../components"
import router from './router'
let app = createApp(App);
//由于暴露了install方法，直接app.use即可使用组件库
//若需要按需导入，使用方法和elementui等组件库相同
//import {HButton} from  "../packages"
//app.use(HButton)
app.use(VxUI)
app.use(router)
app.mount('#app')
