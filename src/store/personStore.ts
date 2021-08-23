import { Module } from 'vuex'
import axios from 'axios'

export default <Module<any,any>> {
    namespaced: true,
    state:{
        person : {
            name : 'John',
            age : 20,
            phone : '0911223344',
            live : 'Taipei'
        }
    },
    actions:{
        setRandomPhone(context){
            const api = axios.create({
                baseURL : 'https://random-data-api.com/api/',
                timeout : 2000
            })
            api.get("/phone_number/random_phone_number")
                .then(resp=>{
                    context.commit('CHANGE_PHONE',resp.data.cell_phone)
                })
                .catch(err=>{ console.log(err) })
        }
    },
    mutations: {
        CHANGE_NAME(state,name){
            state.person.name = name  
        },
        CHANGE_PHONE(state,phone){
            state.person.phone = phone
        },
        CHANGE_AGE(state,age){
            state.person.age = age
        },
        CHANGE_LIVE(state,city){
            state.person.live = city
        }
    },
    getters: {
        fullCity(state){
            return state.person.live + ", Taiwan" 
        }
    }
}