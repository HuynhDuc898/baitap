<template>
  <div id="app">
    <div v-if="isAuthenticated">
          <div class="menu-left pt-5">
              <ul class="nav flex-column">
                  <li class="nav-item" @click="changActive('home')">
                      <router-link  :class="{'active': activeHome}" to="/">Home</router-link>
                  </li>
                  <li class="nav-item" @click="changActive('list-user')">
                      <router-link  :class="{'active': activeListUser}" to="/list/user">List User</router-link>
                  </li>
                  <li class="nav-item" @click="changActive('/list/user/delete')">
                      <router-link  :class="{'active': activeListUserDelete}" to="/list/user/delete">List User Delete</router-link>
                      
                  </li>
                  <!-- <li class="nav-item">
                      <a class="nav-link disabled">Disabled</a>
                  </li> -->
                  
              </ul>
              
        </div>
            <div class="content-right">
                <router-view />
            </div>
      </div>
      <div v-else>
        <router-view />
      </div>
  </div>
  
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import axios from 'axios'

  export default {
    name: 'App',
    data() {
      return {
        activeHome: true,
        activeListUser: false,
        activeListUserDelete: false,
      }
    },
    beforeCreate() {
        const token = localStorage.getItem('token');
        // console.log('token:: ', this.$route.meta);

        if (!token) {
            this.$router.push({name: 'login'});
            return;
        }
        
        // Co token
        // Check token con han hay khong
        // Neu con han thi sang home
        // Khong con thi sang login
        // if (token) {
        // Set axios request header
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        this.$router.push({name: 'home'});
            
        // }
    },
    mounted()
    {
        this.checkLoggedIn();
        // this.listUser();
    },
    // created(){
    //     this.checkLoggedIn();
    //     // this.listUser();
    // },

    computed: mapGetters(['isAuthenticated']),
    methods: {
        checkLoggedIn: function() {
            let token = window.localStorage.getItem('token');
            if(token == null)
            {
                this.$router.push({name: 'login'})
            }
            else
            {
              this.$store.commit('TOGGLE_AUTH')
            }
        },
        changActive: function(data) {
          switch (data) {
            case 'home':
                this.activeHome = true
                this.activeListUser =  false
                this.activeListUserDelete =  false
              break;
            case 'list-user':
                this.activeHome = false
                this.activeListUser =  true
                this.activeListUserDelete =  false
              break;
            case '/list/user/delete':
                this.activeHome = false
                this.activeListUser =  false
                this.activeListUserDelete =  true
              break;
          
            default:
              break;
          }
        }
        
        // count: async function() {
        //     try {
        //         const response = await axios.get(this.apiListUserUrl, {headers: {Authorization: 'Bearer ' + this.token}})
        //         // console.log(response)
        //     } catch (error) {
        //         console.log(error)
        //         // this.$router.push({name: 'login'})
        //     }
        // }
    },

    // computed: mapGetters(['checkLoggedIn']),
}
</script>


<style>
@import'~bootstrap/dist/css/bootstrap.css';

.abcd {
    height: 100%;
    width: 100%;
    position: fixed;
}
.menu-left {
    height: 100%;
    width: 20%;
    background: rgb(231, 228, 228);
    text-align: center;
    position: fixed;
    float: left;
    border-right: 1px solid rgb(56, 51, 51);
    
}

.content-right {
    float: right;
    width: 80%;
    height: 100%;
}
.nav .nav-item {
  padding: 10px 0;
}

.active
{
  background-color: aqua;
}

</style>
