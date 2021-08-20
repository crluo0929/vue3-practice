import {ref,provide} from 'vue'

export default function(){

    const control = ref(false)
    const label = ref('') 

    function loading(text:string){
        control.value = true
        label.value = text
    }

    function clear(){
        control.value = false
    }

    provide('Loading', {
      loading, clear
    })

    return {control,label}

}