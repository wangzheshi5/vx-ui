<template>
    <div class="children-item-box">
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="card-box">
            <div class="content-box">
                <slot name="contentBox"></slot>
            </div>
            <div class="collapse-box">
                <div class="case-english" @click="showCodeBox=!showCodeBox">案例</div>
                <div class="code-block-box" v-if="showCodeBox">
                    <slot name="codeBox"></slot>
                </div>
                
            </div>
        </div>
    </div>
 </template>
 <script setup>
 import { ref } from 'vue';
 const showCodeBox=ref(false)
 </script>
 <style lang="scss" scoped>
 .children-item-box{
    padding: 30px;
    box-sizing: border-box;
 }
    .card-box{
        width: 100%;
        border:1px solid #999;
        padding: 20px 0 0;
        box-sizing: border-box;
        display: flex;
        //垂直排列
        flex-flow: column; 
        //两端对齐
        justify-content: space-between; 
        .content-box{
            margin-bottom: 20px;
        }
        .collapse-box{
            width: 100%;
            min-height: 60px;
            box-sizing: border-box;
            border-top: 1px solid #999;
        }
        .case-english{
            text-align: right;
            padding:20px 30px;
            box-sizing: border-box;
        }
        .code-block-box{
          width: 100%;
          height: auto;
          background-color: #f5f7fa;
          padding: 20px;
          display: flex;
          justify-content: flex-start;
          box-sizing: border-box;
          transition: all 0.6s;
        }
    }
    //子项标题
    .title{
        font-weight:700;
        color: #333;
        font-size: 30px;
        text-align: left;
        margin-bottom: 30px;
    }
 </style>