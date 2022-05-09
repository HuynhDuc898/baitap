<template>
  <div class="container">
        <div class="row">
            <form class="col-4 mx-auto bordered mt-5" @submit.prevent="login()">
                
                <h2>Login</h2>
                
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input v-model="user.email" type="email" name="email" class="form-control" :class="{'is-invalid': errors.status == 400}">
                    <div class="invalid-feedback"> Invalid Credentials </div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="user.password" type="password" name="email" class="form-control"  :class="{'is-invalid': errors.status == 400}">
                    <div class="invalid-feedback">Invalid Credentials</div>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit</button> 
                <!-- <button class="btn btn-primary ml-2" @click="register">Register</button> <span class="text-secondary" :class="{'spinner-border':loading}"></span> -->
            </form>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapState} from 'vuex'

const apiLoginUrl = 'http://127.0.0.1:8000/api/user/login'

export default {
    name: 'Login',
    data(){
        return {
            user: {
                email: '',
                password: ''
            },
            apiLoginUrl,
            errors: {},
            loading: false
            
        }
    },
    methods: {
        login: async function() {
            this.loading =true;

            try {
                const response = await axios.post(this.apiLoginUrl, this.user)
                const token = response.data.token;

                if (!token) {
                    return;
                }

                // Set axios request header
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                localStorage.setItem('token', token);

                this.$store.commit('TOGGLE_AUTH')
                this.$router.push({name: 'home'})
            } catch (error) {
                this.errors = error.response
                this.loading = false
            }
        },
        register: function() {
            this.$router.push({name: 'register'})
        },
         
    }
    
}
</script>

<style>

</style>