<template>
  <div id="nav" class="header">
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/hooks">Hooks</router-link>
        <router-link to="/axios">Axios</router-link>
        <router-link to="/about">About</router-link>
    </nav>
  </div>
  <div class="content">
    <router-view/>
  </div>
  
</template>

<style>
*{
  margin: 0px 0px;
}
button.btn{
  border-radius: 18px;
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
</style>
