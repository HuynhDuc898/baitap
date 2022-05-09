
import Vue from'vue'
import Vuex from 'vuex'

// import modules
import checktoken from './modules/checktoken'
import user from './modules/user'


Vue.use(Vuex)

const storeData = {
    modules: {
        checktoken,
        user
    }
    
}

const store = new Vuex.Store(storeData);

export default store