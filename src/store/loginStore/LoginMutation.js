import * as types from '../mutationTypes.js'
// import Vue from 'vue'

export default{
    [types.LOAD_TNAME](state,data){
        state.Tname=data
        
    }
}