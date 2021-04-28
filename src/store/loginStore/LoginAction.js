import * as Action from '../action.js'
import * as Util from '../../util/util.js'
import * as types from '../mutationTypes.js'

export default{
    ChangeLoginState({commit},data){
        commit('getLoginState',data)
    },
    ChangeLoginId({commit},data){
        console.log("idid",data)
        commit('getLoginId',data)
    },
    ChangeReadRule({commit},data){
        commit('getReadrule',data)
    }
}