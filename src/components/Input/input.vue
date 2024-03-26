<template>
    <input :type="type" 
    :value="modelValue"
    @input="emit('update:modelValue',$event.target.value)"
    >
</template>
<script>
export default {
  name: 'vxInput',
}
</script>
<script setup>
    import { defineProps,defineEmits } from 'vue'
    defineProps(['modelValue',"type"])
    const emit= defineEmits(['update:modelValue'])
</script>
  
<style scoped>
input{
    border: 1px solid #c0c4cc;
    height: 30px;
    font-size: 20px;
    outline:1px solid #c0c4cc;
    color:#999
}
</style>