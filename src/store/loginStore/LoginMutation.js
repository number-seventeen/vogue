import * as types from '../mutationTypes.js'
// import Vue from 'vue'

export default{
    getLoginState(state,data){
        state.LoginState=data
    },
    getLoginId(state,data){
        state.Loginid=data
    },
    getReadrule(state,data){
        state.Readrule=data
    }
}