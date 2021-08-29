<template>
    <div>
        <h1>權限設定</h1>
        <h2>{{data}}</h2>
        <button class="btn btn-primary" @click="complete">下一步</button>
    </div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
    name: 'Content2View',
    setup(){
        let data = ref('')

        function setData(v:any){
            data.value = v
        }
            
        return {
            data
        }
    },
    beforeRouteEnter(to,from,next){
        new Promise((resolve,reject)=>{
            setTimeout(()=>{  //模擬獲取遠端資料
                if(to.meta.errmsg != null){ 
                    reject(to.meta.errmsg)
                }else{
                    resolve('success')
                }
            },1000)
        }).then(
            resp =>{  //獲取成功後，才導航至該頁面
                next( (vm:any) => {
                    vm.setData(resp)  //將獲取的資料存入實體
                })
            },
            error =>{
                alert('處理失敗，不導頁:'+error)
            }
        )
    }
})
</script>
