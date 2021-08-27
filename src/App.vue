<template>
  <div id="nav" class="header">
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/hooks">Hooks</router-link>
        <router-link to="/axios">Axios</router-link>
        <router-link to="/state">State</router-link>
        <router-link to="/multistore">MultiStore</router-link>
        <router-link to="/proj4js">Proj4js</router-link>
        <router-link to="/leaflet">Leaflet</router-link>
        <router-link to="/routes">Routes</router-link>
    </nav>
  </div>
  <div class="content">
    <router-view/>
  </div>
  <Loading :control="control" :text="label" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Loading from './components/Loading.vue'
import useLoading from './hooks/useLoading'

export default defineComponent({
    name: 'App',
    components:{ Loading },
    setup(){
      let {control,label} = useLoading()
      return{
        control,label
      }
    }
})
</script>

<style>
*{
  margin: 0px 0px;
  font-family:微軟正黑體;
}
button.btn{
  border-radius: 13px;
}
button.btn:hover{
  background-color: rgb(255, 193, 7);
  border-color: rgb(255, 193, 7);
  color: black;
}
.header{
  display: flex;
  background-color: #000;
}
.header nav{
  width:100%;
  text-align: center;
}
.header nav a{
  font-size: 20px;
  color: #fff;
  display: inline-block;
  padding: 15px 10px;
  text-decoration: none;
  transition: 0.2s;
}
.header nav a:hover{
  color:#000;
  background-color: #fea;
}
.content{
  margin: 15px 25px;
}
.margin5{
  margin: 5px;
}
</style>
