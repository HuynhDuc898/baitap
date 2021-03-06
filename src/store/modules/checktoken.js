// import axios from 'axios'
const checkAuth = {
    state: {
        auth: {
            isAuthenticated: false
        }
    },

    getters: {
        isAuthenticated: state => state.auth.isAuthenticated
    },

    actions: {
        
    },

    mutations: {
        TOGGLE_AUTH(state) {
            state.auth.isAuthenticated = !state.auth.isAuthenticated
        }
    }
}

export default checkAuth