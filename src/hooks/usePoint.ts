import {reactive, onMounted} from 'vue'
export default function(){

    const point = reactive({
        x : 0,
        y : 0
    })
    onMounted(()=>{
        window.addEventListener('click',(event)=>{
            point.x = event.pageX
            point.y = event.pageY
        })
    })

    return point

}