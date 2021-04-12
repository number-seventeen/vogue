import actions from './LoginAction.js';
import mutations from './LoginMutation.js';
const state={
    Tname:'hhhhhhhh',
    userInfo:{
        id:0,
        username:'',
        password:'',
        usericon:'',
        isidentify:0,

    },
    LoginState:false,
    

}

export default {
    state,
    actions,
    mutations
}