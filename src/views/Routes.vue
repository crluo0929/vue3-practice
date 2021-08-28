<template>
    <div class="container-fluid">
        <div class="row">
            <div class="routesParent col-2">
                <div class="menu-top">
                    <i class="fab fa-vuejs fa-3x" style="position:relative;top:10px;"></i>
                    <span style="color: white;font-size:20px;">路由測試選單</span>
                    
                </div>
                <div class="menu-list">
                    <div class="item">
                        <i class="fas fa-user fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <!-- 在網址上以query的方式帶參數 -->
                        <router-link to="/routes/profile?name='Mike'&phone='0988123456'" v-alt="'在網址上以query的方式帶參數'">個人檔案</router-link>
                    </div>
                    <div class="item">
                        <i class="fas fa-store fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <!-- 綁定屬性帶query參數 -->
                        <router-link :to="goOrderinfo" v-alt="'綁定屬性帶query參數'">訂單資訊</router-link>
                    </div>
                    <div class="item">
                        <i class="fas fa-map fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <!-- 使用'mapinfo/:x/:y'路徑帶參數 -->
                        <!-- <router-link to="/routes/mapinfo/302208.70/2770998.84" >地圖資訊</router-link> -->
                        <!-- 使用'mapinf/:x/:y'路徑帶參數，使用綁定方式與`coord.x`方式取得屬性 -->
                        <router-link :to="`/routes/mapinfo/${coord.x}/${coord.y}`" v-alt="'使用\'mapinfo/:x/:y\'路徑帶參數，使用綁定方式取得屬性'">地圖資訊</router-link>
                    </div>
                    <div class="item">
                        <i class="fas fa-question-circle fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <!-- 綁定屬性帶param參數 -->
                        <router-link :to="goHelpCenter" v-alt="'綁定屬性帶param參數'">客服中心</router-link>
                    </div>
                    <div class="item">
                        <!-- 使用props帶params參數 -->
                        <i class="fab fa-cc-visa fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <router-link :to="goPayment" v-alt="'使用props帶params參數'">刷卡付費</router-link>
                    </div>
                    <div class="item">
                        <!-- 使用props帶query參數 -->
                        <i class="fas fa-phone fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <router-link :to="goContact" v-alt="'使用props帶query參數'" >連絡我們</router-link>
                    </div>
                    <div class="item">
                        <!-- 使用程式控制路由 -->
                        <i class="fas fa-heart fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <span @click="programRoute" v-alt="'使用程式控制路由'">我的最愛</span>
                    </div>
                    <div class="item">
                        <!-- 在route-view加上keep-alive -->
                        <i class="fab fa-line fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <router-link to="/routes/online" v-alt="'在route-view加上keep-alive'" >線上通訊</router-link>
                    </div>
                    <div class="item">
                        <i class="fas fa-bell fa-2x" style="position:relative;top:3px;"></i>&nbsp;
                        <span @click="openMenu">設定參數</span>
                    </div>
                </div>
            </div>
            <div class="contentChild col-10">
                <!-- <router-view/> -->
                <router-view v-slot="{ Component }">
                    <keep-alive include="Child8View">
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>
            <div class="offcanvas offcanvas-start" :class="offcanvasClass" :style="offcanvasStyle" tabindex="-1" id="offcanvas">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasLabel">控制選單</h5>
                    <button type="button" class="btn-close text-reset" @click="closeMenu"></button>
                </div>
                <div class="offcanvas-body">
                    <div>
                        <b>訂單參數設定</b><br>
                        <label>orderno</label>: <input type="text" v-model="orderno"><br>
                        <label>products</label><br>
                        產品名稱: <input type="text" v-model="prodinfo.name" placeholder="輸入" size="10">
                        價錢: <input type="number" v-model="prodinfo.price" size="10">
                        <button class="btn btn-primary" @click="addProd">新增</button><br>
                        產品清單:<br>
                        <ul>
                            <li v-for="(item,index) in products" :key="index">
                                {{item}} <button class="btn btn-danger" @click="delProd(index)">X</button>
                            </li>
                        </ul>
                    </div>
                    <hr>
                    <div>
                        <b>地圖資訊參數</b><br>
                        <label>x</label> <input type="text" v-model="coord.x" size="40"><br>
                        <label>y</label> <input type="text" v-model="coord.y" size="40">
                    </div>
                    <hr>
                    <div>
                        <b>客服中心參數</b><br>
                        <label>提問者</label> <input type="text" v-model="who" size="20"><br>
                        <label>問題內容</label> <input type="text" v-model="question" size="40">
                    </div>
                    <hr>
                    <div>
                        <b>刷卡付費參數</b><br>
                        <label>卡號</label> <input type="text" v-model="cardno" size="20"><br>
                        <label>金額</label> <input type="number" v-model="pay" size="20">
                    </div>
                    <hr>
                    <div>
                        <b>聯絡我們參數</b><br>
                        <label>EMail</label> <input type="text" v-model="email" size="40"><br>
                        <label>傳真</label> <input type="text" v-model="fax" size="40">
                    </div>
                    <hr>

                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent,reactive,ref,toRaw } from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import { faUser,faBell,faMap,faPhone,faStore,faQuestionCircle,faHeart } from '@fortawesome/fontawesome-free-solid'
import { faVuejs,faCcVisa,faLine } from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(faUser,faBell,faMap,faVuejs,faCcVisa,faLine,faPhone,faStore,faQuestionCircle,faHeart)
import useLeftMenu from '../hooks/useLeftMenu'
import { useRouter } from 'vue-router'
export default defineComponent({
    name : 'Routes',
    setup() {
        //左邊選單
        let {offcanvasClass,offcanvasStyle,openMenu,closeMenu} = useLeftMenu()
        //路由器
        let router  = useRouter()

        //訂單資訊
        let prodinfo = reactive({name:'',price:0})
        let orderno = ref('K123456788')
        let products = reactive([
            JSON.stringify({
                name : '魯肉飯',
                price : 45
            }),
            JSON.stringify({
                name : '貢丸湯',
                price : 30
            })
        ])
        function addProd(){
            products.push(JSON.stringify(toRaw(prodinfo)))
        }
        function delProd(index:any){
            products.splice(index,1)
        }
        let goOrderinfo = reactive({
            path : '/routes/orderinfo',
            query : {
                orderno : orderno, //不可以用orderno.value，否則會失去reactive效果
                //query是帶在網址上的參數，不能帶物件，只能帶字串
                products : products
            }
        })
        //地圖資訊
        let coord = reactive({x:"302208.70", y: "2770998.84"})

        //客服中心
        let who = ref('Ironman')
        let question = ref('account is blocked')
        let goHelpCenter = reactive({
            //params 一定要使用name做對應，不可使用path
            name : 'helpcenter',
            params : {
                who : who,
                question: question
            }
        })
        //刷卡付費
        let cardno = ref('VISA123456789')
        let pay = ref(30560)
        let goPayment = reactive({
            name : 'payment',
            params: {
                cardno : cardno,
                pay : pay
            }
        })
        //我的最愛
        function programRoute(){
            //router.replace({}) 則是取代上一次瀏覽網址的歷史紀錄
            router.push({
                name : 'favorite',
                params: {
                    favname : 'google搜尋',
                    favpath : 'http://www.google.com'
                }
            })
        }

        //聯絡我們
        let email = ref('hello@test.com')
        let fax = ref('02-22334455')
        let goContact = reactive({
            name : 'contact',
            query : {
                email : email,
                fax : fax
            }
        })

        return {
            goOrderinfo,goHelpCenter,goPayment,goContact, //路由
            offcanvasClass,offcanvasStyle,openMenu,closeMenu, //選單項目
            orderno, products, prodinfo, addProd, delProd, //訂單參數
            coord, //地圖資訊
            who,question, //客服中心
            cardno,pay, //刷卡付費
            email, fax, //聯絡我們
            programRoute //我的最愛

        }
        
    },
})
</script>
<style scoped>
.routesParent{
    height : 90vh;
    padding-left:0px;
    padding-right:0px;
    /* width: 75px; */
    background-color: #3c4b64;
}
.contentChild{
    border: 1px solid #232730;
}
.menu-top{
    height: 65px;
    width:100%;
    text-align: center;
    color: white;
    background-color: #303c54;
    
}
.menu-list{
    height: 40px;
    color: white;
}
.menu-list .item{
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20%;
}
.menu-list .item:hover{
    background-color: #321fdb;
    transform: scale(1.02)
}
.menu-list .item > a,span{
    color: white;
    font-size:20px;
    text-decoration-line: none;
}
.menu-list .item > a,span:hover{
    cursor: pointer;
}
.offcanvas-start{
    width : 450px;
}
</style>