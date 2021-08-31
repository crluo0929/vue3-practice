<template>
    <div>
        <h1>刷卡付費</h1>
        <h2>卡號: {{cardno}}</h2>
        <h2>金額: {{pay}}</h2>
        <hr>
        {{route.fullPath}}
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import {useRoute} from 'vue-router'

export default defineComponent({
    name: 'Child5View',
    props:['cardno','pay'],
    setup(){
        const route = useRoute()
        return {
            route
        }
    }
})
</script>
