<template>
    <div>
        <h1>我的最愛</h1>
        <h2>名稱: {{favname}}</h2>
        <h2>網址: {{favpath}}</h2>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Child7View',
    props : ['favname', 'favpath']
})
</script>
