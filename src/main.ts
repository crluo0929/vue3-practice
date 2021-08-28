import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)
    app.use(store)
    app.use(router)
    app.directive('alt', {
        mounted(el,binding){
            el.onmouseenter = ()=>{
                const span:any = document.createElement("span")
                span.style="position:relative;float:right;background-color:white;color:black;font-size:14px;border:1px solid gray"
                span.innerText = binding.value ? binding.value : '沒有補充資訊'
                el.append(span)
            }
            el.onmouseout = ()=>{
                el.firstElementChild.remove()
                
            }
        }
    }
    )
    app.mount('#app')
