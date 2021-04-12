import * as Action from '../action.js'
import * as Util from '../../util/util.js'
import * as types from '../mutationTypes.js'

export default{
    ChangeLoginState({commit},data){
        commit('getLoginState',data)
    }
}