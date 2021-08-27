import { ref,reactive } from "vue"

export default function(){

    //左邊選單
    const showMenu = ref(false)
    const offcanvasClass = reactive({'show': false })
    const offcanvasStyle = reactive({'visibility' : 'hidden' })
    function openMenu(){
        showMenu.value = true
        offcanvasStyle.visibility = 'visible'
        offcanvasClass.show = true
    }
    function closeMenu(){
        showMenu.value = false
        offcanvasClass.show = false
        setTimeout(()=>{ //show會連動transform，所以先播完動畫後再hidden
            offcanvasStyle.visibility = 'hidden'
        },300)   
    }

    return { offcanvasClass, offcanvasStyle,openMenu, closeMenu}

}