<template>
    <div>
        <h1>線上通訊</h1>
        <div style="width:100%;height:60vh;border:1px solid gray;">
            <p style="text-align:center;position: relative;top:50%;">
                在訊息框裡輸入訊息，然後切換到其它頁籤後再切回來，訊息不會被 unmounted!
            </p>
        </div><br>
        <input type="text" style="width:95%" placeholder="輸入訊息" />&nbsp;
        <button class="btn btn-primary">送出</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Child8View',
    beforeUnmount(){
        console.log('before unmount')
    }
})
</script>
<style scoped>

</style>