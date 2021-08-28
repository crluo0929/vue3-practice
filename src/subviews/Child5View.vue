<template>
    <div>
        <h1>刷卡付費</h1>
        <h2>卡號: {{cardno}}</h2>
        <h2>金額: {{pay}}</h2>
    </div>
</template>
<script lang="ts">
import { defineComponent,toRefs } from 'vue'

export default defineComponent({
    name: 'Child5View',
    props:['cardno','pay']
})
</script>
