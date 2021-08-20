<template>
    <div :class="modalClass" id="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">{{title}}</h5>
                <button type="button" class="btn-close" @click="close"></button>
            </div>
            <div class="modal-body">
                <p>{{content}}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="close">Close</button>
            </div>
            </div>
        </div>
    </div>
    <div v-if="isActive" class="modal-backdrop fade show"></div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'

export default defineComponent({
    name: 'Dialog',
    props:['title','content','isActive'],
    emits:['close'],
    setup(props,context){
        let { isActive } = toRefs(props)
        let modalClass = reactive(['modal', 'fade', {'show modalShow' : isActive } ])
        function close(){
            context.emit('close')
        }
        return {
            modalClass,close
        }
    }
})
</script>
<style scoped>
.modalShow {
    display: block ;
}
</style>