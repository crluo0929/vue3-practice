<template>
    <div>
        <h1>帳號設定</h1>
        <h2>使用者清單</h2>
        <ul>
            <li v-for="user in users" :key="user.id">
                <div>
                    帳號： <input type="text" disabled :value="user.uid" size="45"><br>
                    名稱： <input type="text" :value="user.username" size="45"><br>
                    密碼： <input type="text" :value="user.password" size="45"><br>
                    信箱： <input type="text" :value="user.email" size="45">
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'

export default defineComponent({
    name: 'Content1View',
    setup(){
        let users = reactive([])

        function pushData(items:[]){
            users.push(...items)
        }

        return {
            users, pushData
        }
    },
    //Composition API沒有將onBeforeRouteEnter曝露出來，只有onBeforeRouteLeave和onBeforeRouteUpdate
    beforeRouteEnter (to, from, next) {
        let api = axios.create({
            baseURL : "https://random-data-api.com/api"
        })
        //導頁前先獲取資料，並準備好之後才導入
        api.get("/users/random_user",{params : {size : 5} })
            .then(res=>{ //假設回應都是200 OK
                let items = res.data as []
                next((vm:any)=>{ vm.pushData(items) })
            })
            .catch(err=>{
                alert('Component Guard: (處理失敗，不導頁) '+err)
            })
    }


})
</script>
