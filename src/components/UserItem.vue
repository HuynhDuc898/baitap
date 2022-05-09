<template>
  <tr>
        <td ><input type="checkbox" @change="handleSelectUser(userProps.id)"></td>
        <td>{{userProps.name}}</td>
        <td>{{userProps.email}}</td>
        <td>{{userProps.role.name}}</td>
        <td>
            <!-- Button trigger modal -->
            <button class="btn-update btn" type="button"  data-toggle="modal" data-target="#exampleModalCenter2" @click="handleUpdateClick(userProps)">Update</button>

            <div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered popup-add" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title text-center" id="exampleModalLongTitle">Update User</h5>
                        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"> -->
                        <!-- <span aria-hidden="true">&times;</span> -->
                        <!-- </button> -->
                    </div>

                    <div class="modal-body">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                <label>First Name</label>
                                <input v-model="userUpdate.first_name" type="text" class="form-control"  placeholder="First Name" >
                                </div>
                                <div class="form-group col-md-12">
                                <label >Last Name</label>
                                <input v-model="userUpdate.last_name" type="text" class="form-control"  placeholder="Last Name" > 
                                </div>
                                <div class="form-group col-md-12">
                                <label>Email</label>
                                <input v-model="userUpdate.email" type="email" class="form-control"  placeholder="Email" > 
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateUser">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    
                
                </div>
            </div>
            </div>

            <button class="btn-del ml-2" @click.prevent="delSoftUser(userProps.id)">Delete</button>
        </td>
    </tr>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

export default {
    name: 'UserItem',
    props: ['userProps'],
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                id: '',
                role_id: ''
            },
        }
    },
    computed: mapGetters(['userUpdate']),
    methods: {
        ...mapActions(['delSoftUser']),
        handleSelectUser: function(userId) {
            this.$emit('select', userId);
        },

        handleUpdateClick: function(user) {
            
            this.$store.commit('HANDLE_UPDATE_USER', user)
            // this.user = {
            //     firstName: user.first_name,
            //     lastName: user.last_name,
            //     email: user.email,
            //     id: user.id,
            //     role_id: user.role_id
            // };
            // this.user.firstName = user.first_name
            // this.user.lastName = user.last_name
            // this.user.email = user.email
            // this.user.id = user.id
            // this.user.role_id = user.role_id
        },

        updateUser: function() {
            
            this.$store.dispatch('updateUser', this.userUpdate)
        },

    }
}
</script>

<style scoped>
.btn-del {
    background: rgb(240, 58, 58);
    color: #ffff;
    border: none;
    padding: 4px;
    cursor: pointer;
    width: 70px;
    border-radius: 5px;
    
}
.btn-del:hover {
    background-color: #b3340e;
    color: black;
}
.btn-update {
    background: rgb(73, 104, 109);
    color: #ffff;
    border: none;
    padding: 4px;
    cursor: pointer;
    width: 70px;
    border-radius: 5px;
    
}
td, th {
    text-align: left;
    padding: 10px;
}

@media (min-width: 576px){
    .modal-dialog {
    max-width: 1000px;
    width: 80%;
    margin: 1.75rem auto;
    }
}
.modal-content {
    padding: 20px;
}
</style>