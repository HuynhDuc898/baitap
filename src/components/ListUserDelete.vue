<template>
  <div>
        <!-- <div>
            <button class='btn btn-primary btn-restore-all' v-if="userIds.length> 0" @click="restoreAll">Restore</button>
            <button class='btn btn-success btn-add' type="button">Add</button>
        </div> -->
        
        <table class="list-user">
                <tr class="first-row">
                    <!-- <th></th> -->
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Chức Năng</th>
                </tr>
                <UserItemDelete 
                    v-for="(user,index) in listUserDelete"
                    :key="index" 
                    :userProps="user"
                    @select="handleSelectUser"
                />
        </table>
        <!-- <h2>abc</h2> -->
  </div>
</template>

<script>
import UserItemDelete from './UserItemDelete'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

export default {
    name: "ListUserDelete",
    components: { UserItemDelete},
    data(){
        return {
            userIds: [],
        }
    },
    created() {
        this.getUserDelete()
    },

    computed: mapGetters(['listUserDelete']),
    
    methods: {
        handleSelectUser: function(userId) {
            if(this.userIds.includes(userId))
            {
                this.userIds = this.userIds.filter(id => id !== userId)
            }
            else
            {
                this.userIds.push(userId)
            }
            console.log(this.userIds);
        },

        // restoreAll: function() {
        //     // if(this.userIds.length > 0)
        //     // {
        //     //     this.$store.dispatch('delSoftAllUser', this.userIds)
        //     //     this.userIds = []
        //     // }
        // },

        ...mapActions(['getUserDelete'])
    }
}
</script>

<style scoped>

td, th {
    text-align: left;
    padding: 10px;
}
.list-user {
    width: 100%;
    border-collapse: collapse;
}

.list-user, th, td {
    padding: 10px;
    /* border-bottom: 1px solid black; */
    font-size: 16px;
}

.first-row {
    background: #adc4f5;
}

tr:nth-child(even) {background-color: #a4dbf5;}

</style>