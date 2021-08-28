<template>
    <div>
        <h1>聯絡我們</h1>
        <h2>EMail: {{email}}</h2>
        <h2>傳真: {{fax}}</h2>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Child5View',
    props: ['email','fax']
})
</script>
