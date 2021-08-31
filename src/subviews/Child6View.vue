<template>
    <div>
        <h1>聯絡我們</h1>
        <h2>EMail: {{email}}</h2>
        <h2>傳真: {{fax}}</h2>
        <hr>
        {{route.fullPath}}
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
    name: 'Child5View',
    props: ['email','fax'],
    setup(){
        const route = useRoute()
        return { route }
    }
})
</script>
