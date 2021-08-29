<template>
    <div>
        <h1>其它設定</h1>
        <h2>試著離開此頁</h2>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import {onBeforeRouteLeave} from 'vue-router'

export default defineComponent({
    name: 'Content3View',
    setup(){

        onBeforeRouteLeave((to, from) => {
            const answer = window.confirm(
                '你真的要離開嗎?'
            )
            if (!answer) return false
        })
        
    }
})
</script>
