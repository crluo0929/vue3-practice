<template>
    <section class="error_section">
      <p class="error_section_subtitle">{{errorMessage}}</p>
      <h1 class="error_title">
        ERROR
      </h1>
      <a class="errBtn" @click="goBack">回上頁</a>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'Error',
    props: ['errorMessage'],
    setup(){
        const router = useRouter()
        function goBack(){
            router.go(-1)
        }
        return {
            goBack
        }
    }
})
</script>
<style scoped>
* {
  margin: -15px -25px;
  padding: 0;
}

a {
  text-decoration: none;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  color: #343434;
}

.error_section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 94vh;
  background-image: linear-gradient(-225deg, #424242, #888585);
}
.error_section_subtitle {
  color: #25F193;
  text-transform: uppercase;
  letter-spacing: 5pt;
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: -3em;
}
.error_section .error_title {
  --x-shadow: 0;
  --y-shadow: 0;
  --x:50%;
  --y:50%;
  font-size: 15rem;
  transition: all 0.2s ease;
  position: relative;
  padding: 2rem;
}
.error_section .error_title:hover {
  transition: all 0.2s ease;
  text-shadow: var(--x-shadow) var(--y-shadow) 10px #1A1A1A;
}
.error_section .error_title p {
  position: absolute;
  top: 2rem;
  left: 2rem;
  background-image: radial-gradient(circle closest-side, rgba(255, 255, 255, 0.05), transparent);
  background-position: var(--x) var(--y);
  background-repeat: no-repeat;
  text-shadow: none;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.1s ease;
}

.errBtn {
  padding: 0.8em 1.5em;
  border-radius: 99999px;
  background-image: linear-gradient(to top, #25af6f, #28ce80);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2), inset 0px -2px 5px 0px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  text-shadow: 0px 1px #343434;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1.5pt;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  transition: ease-out 0.2s all;
}
.errBtn:hover {
  text-shadow: 0px 1px 1px #343434;
  transform: translateY(-5px);
  box-shadow: 0px 4px 15px 2px rgba(0, 0, 0, 0.1), inset 0px -3px 7px 0px rgba(0, 0, 0, 0.2);
  transition: ease-out 0.2s all;
}
</style>