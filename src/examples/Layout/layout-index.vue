<template>
   <div class="layout-box">
       <div class="layout-left">
         <div v-for="(item,index) in menuList" :key="index" class="menu-item" @click="menuClick(item)">{{item.name}}</div>
       </div>
       <div class="layout-right">
         <router-view></router-view>
       </div>
   </div>
</template>
<script>
export default {
  name: 'LayoutIndex',
}
</script>
<script setup>
import { useRouter } from 'vue-router'
const router=useRouter()
const menuList=[{
   code:1,
   name:'input 输入框'
}]
console.log(router.getRoutes())
const menuClick=(item)=>{
   router.push({path:'/input'})
}
  console.log(2432342342)
</script>
<style lang="scss" scoped>
   .layout-box{
      display: flex;
      justify-content: flex-start;
      height:100vh;
      width: 100%;
      .layout-right{
        flex: 1;
      }
      .layout-left{
         width:200px;
         height:100%;
         background-color: #f7f7f7;
         .menu-item{
            width: 100%;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
         }
      }
   }
</style>