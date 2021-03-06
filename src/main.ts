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
                span.style="position:absolute;float:center;background-color:black;color:white;font-size:14px;border:1px solid gray;white-space:nowrap;"
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
