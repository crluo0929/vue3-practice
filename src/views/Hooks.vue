<template>
    <div >
        <h1>滑鼠點擊位置</h1>
        <h2>X: {{point.x}}, Y: {{point.y}}</h2>
    </div>
</template>
<script>
import {defineComponent} from 'vue'
import usePoint from '../hooks/usePoint'

export default defineComponent({
    name: 'Hooks',
    setup(){
        let point = usePoint()
        return {
            point
        }
    }
})
</script>
<style scoped>
    
</style>