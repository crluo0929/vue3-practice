<template>
    <div>
        <h1>Axios</h1>
        <button class="btn btn-primary" @click="randomApp">GET: /app/random_app</button><br>
        app info:
        <ul>
            <li v-for="app in appList" :key="app.id">
                app name: {{app.app_name}}, app version: {{app.app_version}}
            </li>
        </ul>
        <hr>
        <button class="btn btn-primary" @click="randomAuth">POST: /omniauth/google_post</button><br>
        provider: {{authInfo?.data?.provider}}<br>
        token: {{authInfo?.data?.credentials.token}}<br>
        <hr>
        <button class="btn btn-primary" @click="getUserInfo">Async await</button><br>
        user info:<br>
        name : {{ userInfo?.userName }}<br>
        city : {{ userInfo?.city }}<br>
        Promise : {{ userInfo?.result }}<br>
        <hr>
        <button class="btn btn-primary" @click="addInterceptor">加入Interceptor</button>
    </div>
</template>
<script lnag="ts">
import {defineComponent, reactive, inject} from 'vue'
import axios from 'axios'

export default defineComponent({
    name:'Axios',
    setup(){
        let api = axios.create({
            baseURL : "https://random-data-api.com/api"
        })
        //app info
        let appList = reactive([])
        function randomApp(){
            api.get("/app/random_app", {params : {size : 3} })
            .then( res=>{
                appList.length=0 //clear array
                appList.push( ...res.data )
             })
            .catch( err=>{ console.log(err) })
        }
        //auth info
        let authInfo = reactive({})
        function randomAuth(){
            api.post("/omniauth/google_post",{})
            .then( res => {
                authInfo.data = res.data //因為是reactive，不能直接assign data
            })
            .catch(err => console.log(err))
        }
        //async getUserInfo
        let userInfo = reactive({})
        async function getUserInfo(){
            try{
                let userData = await api.get("/name/random_name")
                userInfo.userName = userData.data.name
                let addrData = await api.get("/address/random_address")
                userInfo.city = addrData.data.city
                let result = await new Promise((resolve, reject)=>{
                    setTimeout(()=>{ //因為不是axios，所以不會有interceptor效果
                        resolve('查詢完畢 '+new Date().toLocaleTimeString() )
                    }, 1000)
                })
                userInfo.result = result
            }catch(err){
                console.log(err)
            }
        }
        //add interceptor
        const Loading = inject('Loading') 
        function addInterceptor(){
            api.interceptors.request.use(
                config =>{
                    Loading.loading('讀取中...')
                    return config
                },
                err =>{ return Promise.reject(err) }
            )
            api.interceptors.response.use(
                resp =>{
                    Loading.clear()
                    return resp
                },
                err =>{
                    return Promise.reject(err)
                }
            )
            alert('新增成功，接下來呼叫都會加入Loading畫面了')
        }

        return {
            appList, randomApp, 
            authInfo, randomAuth,
            userInfo, getUserInfo,
            addInterceptor
        }

    }
})
</script>
<style>
    
</style>