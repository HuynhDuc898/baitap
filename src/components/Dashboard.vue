<template>
        
        <div><h2>abc</h2></div>
 
</template>

<script>
// import axios from 'axios'
// import {mapGetters} from 'vuex'

const apiListUserUrl = 'http://127.0.0.1:8000/api/user/list?search='
// const token = window.localStorage.getItem('token')
export default {
    name: 'Dashboard',
    data() {
        return {
            apiListUserUrl
        }
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
    methods: {
        checkLoggedIn: function() {
            let token = window.localStorage.getItem('token');
            if(token == null)
            {
                this.$router.push({name: 'login'})
            }
        },
        // listUser: async function() {
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

<style scoped>

.abcd {
    height: 100%;
    width: 100%;
    position: fixed;
}
.menu-left {
    height: 100%;
    width: 20%;
    background: rgb(95, 91, 91);
    text-align: center;
    position: fixed;
    float: left;
    
}

.content-right {
    float: right;
    background: gray;
    width: 80%;
    height: 100%;
}

</style>