// import axios from 'axios'
const todoModules = {
    state: {
        checkToken: {
            token: window.localStorage.getItem('token')
        }
    },

    getters: {
        checkLoggedIn: (state) => {
            if(state.checkToken.token == null)
            {
                console.log('124234')
                this.$router.push({name: 'login'})
            }
            
        }
    },

    actions: {
        
    },

    mutations: {
        
    }
}

export default todoModules