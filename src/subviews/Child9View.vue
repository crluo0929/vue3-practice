<template>
    <div>
        <h1>Routing Guards</h1>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link class="nav-link" to="/routes/database/content1">帳號設定</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/routes/database/content2">權限設定</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/routes/database/content3">其它設定</router-link>
            </li>
        </ul>
        <div class="inner-router-view">
            <router-view/>
        </div>
        
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Child9View'
    
})
</script>
<style scoped>
.router-link-exact-active{
    background-color: rgb(228, 229, 243);
    font-weight: bold;
}
.inner-router-view{
    padding: 10px;
}
ul li a{
  color: black !important;
} 
</style>