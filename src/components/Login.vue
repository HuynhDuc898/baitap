<template>
  <div class="container">
        <div class="row">
            <form class="col-4 mx-auto bordered mt-5" @submit.prevent="login">
                
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
                <button class="btn btn-primary ml-2" @click="register">Register</button> <span class="text-secondary" :class="{'spinner-border':loading}"></span>
            </form>
        </div>
  </div>
</template>

<script>
import axios from 'axios'

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
            this.loading =true
            try {
                const response = await axios.post(this.apiLoginUrl, this.user)
                window.localStorage.setItem('token', response.data.token)

                this.$router.push({name: 'home'})
                // console.log(response)
            } catch (error) {
                this.errors = error.response
                this.loading = false
                // console.log(error.response.data.error)
            }
        },
        register: function() {
            this.$router.push({name: 'register'})
        }


    }
    
}
</script>

<style>

</style>