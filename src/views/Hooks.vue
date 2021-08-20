<template>
    <div >
        <h1>X位置: {{point.x}}, Y位置: {{point.y}}</h1>
    </div>
</template>
<script>
import {defineComponent, reactive, onMounted} from 'vue'
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