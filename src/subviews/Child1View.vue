<template>
    <div>
        <h1>個人檔案</h1>
        <h2>姓名: {{name}}</h2>
        <h2>電話: {{phone}}</h2>
        <hr>
        {{route.fullPath}}
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'Child1View',
    setup() {
        const route = useRoute()
        let name = route.query.name
        let phone = route.query.phone

        return {
            name, phone,route
        }
    }
})
</script>
