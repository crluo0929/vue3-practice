<template>
    <div>
        <h1>地圖資訊</h1>
        <h2>座標資訊</h2>
        <h3>x : {{x}}, y: {{y}}</h3>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
    name: 'Child3View',
    setup() {
        const route = useRoute()
        let x = route.params.x
        let y = route.params.y
        return {
            x,y
        }
    },
})
</script>
