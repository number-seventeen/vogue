import actions from './LoginAction.js';
import mutations from './LoginMutation.js';
const state={
    LoginState:false,
    Loginid:0,
    Readrule:false,
    websocktData:{
        type:'',//出价信息，//结束通知，
        workid:0,
        userid:0,
    }
    

}

export default {
    state,
    actions,
    mutations
}