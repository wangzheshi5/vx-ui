<template>
  <!-- 基础用法 -->
  <CommonAlert>
    <template #title>
     基础用法
    </template>
    <template #contentBox>
      <VxInput v-model="inputData.textValue" type="text"/>
    </template>
    <template #codeBox>
      <div class="code-style">
         {{baseUseFunction}}
      </div>
    </template>
  </CommonAlert>
  <!-- 基础用法 -->
  <CommonAlert>
    <template #title>
    禁用状态
    </template>
    <template #contentBox>
      <VxInput v-model="inputData.numberValue"  type="text"  :disabled="true"/>
    </template>
    <template #codeBox>
      <div class="code-style">
         {{baseUseFunction}}
      </div>
    </template>
  </CommonAlert>
</template>
<script>
export default {
  name: 'InputIndex',
}
</script>
<script setup>
import { ref } from 'vue';
import VxInput from '@/components/Input/input.vue';
import CommonAlert from '../components/common-alert.vue';
let inputData =ref({
  textValue:'',
  numValue:''
})
const baseUseFunction=` <VxInput v-model="userName" type="text"/>`
</script>