<template>
    <div class="card text-white">
        <h5 class="card-header" :class="headerClass">Panel</h5>
        <div class="card-body text-black">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'

export default defineComponent({
    name: 'Panel',
    props: {
        'panelHeaderClass' : {required : false, default: 'bg-primary'}
    },
    setup(props){
        let headerClass = ref({})
        let { panelHeaderClass } = toRefs(props)
        headerClass.value = panelHeaderClass.value
        return {
            headerClass
        }
    }
})
</script>
<style scoped>

</style>
