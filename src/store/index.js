import Vue from 'vue'
import Vuex from 'vuex'
import homeStore from './homeStore/HomeStore.js'
import loginStore from './loginStore/LoginStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		homeStore,
		loginStore,
		
	}
})