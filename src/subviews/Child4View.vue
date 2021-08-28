<template>
    <div>
        <h1>客服中心</h1>
        <h2>提問者: {{who}}</h2>
        <h2>問題內容: {{question}}</h2>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'Child4View',
    setup() {
        const route = useRoute()
        let who = route.params.who
        let question = route.params.question
        return {
            who,question
        }
    },
})
</script>
