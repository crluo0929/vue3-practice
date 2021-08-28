<template>
    <div>
        <h1>訂單資訊</h1>
        <h2>訂單編號: {{orderno}}</h2>
        <h2>訂購資訊</h2>
        <ul>
            <li v-for="(item,index) in products" :key="index">
                商品名稱: {{item.name}}, 商品價格: {{item.price}}
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent,reactive} from 'vue'
import {useRoute} from 'vue-router'
export default defineComponent({
    name: 'Child2View',
    setup() {
        const route = useRoute()
        let orderno = route.query.orderno
        let products = reactive((route.query.products as []).map((item:any) => JSON.parse(item)))
        return {
            orderno,products
        }
    },
})
</script>
