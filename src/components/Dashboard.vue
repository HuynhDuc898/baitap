<template>
        
    <div class='container'>
        <div class="row mt-5">
            
                <div class='dashboard btn' >
                    List User: {{totalUser}}
                </div>
            
        </div>
        
    </div>
 
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

const apiListUserUrl = 'http://127.0.0.1:8000/api/user/list?search='

export default {
    name: 'Dashboard',
    data() {
        return {
            apiListUserUrl,
            totalUser: 0
        }
    },
    mounted() {
        this.checkLoggedIn();
        this.getUserDashboard();
       
    },
    created(){
        
    },
    computed:{
        
    },
    methods: {
        checkLoggedIn: function() {
            let token = window.localStorage.getItem('token');
            if(token == null)
            {
                this.$router.push({name: 'login'})
            }
        },
        getUserDashboard: async function() {
            return await axios.post("http://127.0.0.1:8000/api/user/dashboard")
                .then(response => {
                    this.totalUser = response.data.user;
                })
                .catch(error => {
                    console.log(error)
                });
        } 
    },
    // computed: mapGetters(['countUser']),
    
}
</script>

<style scoped>


.dashboard {
    width: 200px;
    height: 100px;
    line-height: 100px;
    font-size: 16px;
    background: rgb(208, 224, 169);
    position: fixed;
    border: none;
    font-weight: 20px;
}


</style>