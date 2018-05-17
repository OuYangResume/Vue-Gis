<template>
    <div>
        <router-link  to="/user">Users</router-link>
        <router-link  to="/test">Test</router-link> 
        <router-link  to="/Translate">在线翻译</router-link> 
        <router-link  :to="{name:'map'}">地图</router-link>
        <router-link  to="/echarts">echarts</router-link>
        <router-link :to="{name:'element'}">饿了么</router-link>
    </div> 
</template>
