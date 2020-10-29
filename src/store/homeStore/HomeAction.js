// import * as Action from '../actions.js'
import * as types from '../mutationTypes.js'

export default{
    holdtime({commit},data){
        commit(types.START_COUNT,data)
        
    },
    changetime({commit},data){
        console.log("hao",data)
        commit(types.CHANGE_COUNT,data)
    },
}