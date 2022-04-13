
import Vue from'vue'
import Vuex from 'vuex'

// import modules
import checktoken from './modules/checktoken'


Vue.use(Vuex)

const storeData = {
    modules: {
        checktoken,
    }
    
}

const store = new Vuex.Store(storeData);

export default store