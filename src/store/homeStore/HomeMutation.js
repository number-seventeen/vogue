import * as types from '../mutationTypes.js'
// import Vue from 'vue'

export default{
    [types.START_COUNT](state,data){
        state.msec=data

        
    },
    [types.CHANGE_COUNT](state,data){
        state.counts=data

        
    }
}