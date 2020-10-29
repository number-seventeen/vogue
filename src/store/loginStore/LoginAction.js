// import * as Action from '../actions.js'
import * as types from '../mutationTypes.js'

export default{
    checklogin({commit},data){
        commit(types.LOAD_TNAME,data)
    }
}