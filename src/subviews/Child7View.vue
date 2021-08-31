<template>
    <div>
        <h1>我的最愛</h1>
        <h2>名稱: {{favname}}</h2>
        <h2>網址: {{favpath}}</h2>
        <hr>
        {{route.fullPath}}
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
    name: 'Child7View',
    props : ['favname', 'favpath'],
    setup(){
        const route = useRoute()
        return { route }
    }
})
</script>
