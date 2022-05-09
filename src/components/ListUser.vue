<template>
    <div>
        <SearchUser @search-user="getUser" />
        <div>
            <button class='btn btn-danger btn-del-all' v-if="userIds.length> 0" @click="deleteAll">Delete</button>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-success btn-add" data-toggle="modal" data-target="#exampleModalCenter">
            Add
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered popup-add" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        
                        <h5 class="modal-title text-center" id="exampleModalLongTitle">Create User</h5>
                        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"> -->
                        <!-- <span aria-hidden="true">&times;</span> -->
                        <!-- </button> -->
                    </div>

                    <div class="modal-body">
                        <p v-if="errors.length">
                        <ul style="list-style: none;" class="alert alert-danger">
                            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                        </ul>
                        </p>
                        <form enctype="multipart/form-data" novalidate>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                <label>First Name</label>
                                <input type="text" class="form-control"  placeholder="First Name" v-model="user.firstName">
                                </div>
                                <div class="form-group col-md-4">
                                <label >Last Name</label>
                                <input type="text" class="form-control"  placeholder="Last Name" v-model="user.lastName">
                                </div>
                                <div class="form-group col-md-4">
                                <label>Email</label>
                                <input type="email" class="form-control" @change="checkUniqueEmail"  placeholder="Email" v-model="user.email">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                <label >Password</label>
                                <input type="password" class="form-control"  placeholder="Password" v-model="user.password">
                                </div>
                                <div class="form-group col-md-6">
                                <label >Password Confirm</label>
                                <input type="password" class="form-control"  placeholder="Password Confirm" v-model="user.paswordConfirm">
                                </div>
                                
                            </div>
                            <div class="form-group">
                                <div class="form-group col-md-6">
                                <label>Avatar</label>
                                <input type="file" @change="onImageChange($event)" class="form-control-file">
                                </div>
                                
                            </div>
                        </form>
                    </div>
                    
                    <div class="modal-footer" >
                        <button type="button" class="btn btn-primary" v-if="statusCreate === true" data-dismiss="modal" @click="createUser">Save</button>
                        <button type="button" class="btn btn-primary" v-else  @click="createUser">Save</button>

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    
                
                </div>
            </div>
            </div>
        </div>
        
        <table class="list-user">
                <tr class="first-row">
                    <th></th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Chức Năng</th>
                </tr>
                <UserItem 
                    v-for="(user,index) in listUser"
                    :key="index" 
                    :userProps="user"
                    @select="handleSelectUser"
                />
        </table>
        <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
        <div class="toast" style="position: absolute; top: 0; right: 0;">
            <div class="toast-header">
            <img src="..." class="rounded mr-2" alt="...">
            <strong class="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="toast-body">
            Hello, world! This is a toast message.
            </div>
        </div>
        </div>
    </div>
  
</template>

<script>
import SearchUser from './SearchUser'
import UserItem from './UserItem'
import axios from 'axios'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

export default {
    name: "ListUser1",
    components: {SearchUser, UserItem},
    data() {
        return {
            userIds: [],
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                paswordConfirm: '',
                role: 1, 
                avatar: ''
            },
            errors: [],
            statusCreate: false
            // listUserTest: {}

        }
    },

    created() {
        this.getUser()
        // this.getUserTest()
        
    },

    computed: mapGetters(['listUser']),
    
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
        },

        deleteAll: function() {
            if(this.userIds.length > 0)
            {
                this.$store.dispatch('delSoftAllUser', this.userIds)
                this.userIds = []
            }
        },
        checkUniqueEmail: function() {
            // console.log(this.user.email);
        },
        checkFormCreate: function() {
            if (!this.user.firstName) {
                
                this.errors.push("First Name required.");
            }

            if (!this.user.lastName) {
                this.errors.push("Last Name required.");
            }

            if (!this.user.password) {
                this.errors.push("Password required.");
            }

            if (!this.user.paswordConfirm) {
                this.errors.push("Password Confirm required.");
            }

            if (!this.user.email) {
                this.errors.push('Email required.');
            } else if (!this.validEmail(this.user.email)) {
                this.errors.push('Valid email required.');
            }
        },
        validEmail: function(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        createUser: async function(){
            this.errors = []
            this.checkFormCreate()
            if(this.errors.length == 0)
            {
                const userFormData = new FormData();
                userFormData.append('first_name', this.user.firstName);
                userFormData.append('last_name', this.user.lastName);
                userFormData.append('email', this.user.email);
                userFormData.append('role_id', this.user.role);
                userFormData.append('password', this.user.password);
                userFormData.append('password_confirmation', this.user.paswordConfirm);
                userFormData.append('avatar', this.user.avatar);

                return await axios.post("http://127.0.0.1:8000/api/user/insert",
                        userFormData, 
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                    .then(response => {
                        if(response.data.status == 400)
                        {
                            let err = response.data.body
                            err.forEach(element => {
                                
                                this.errors.push(element)
                            });
                        }

                        if(response.data.status == 200)
                        {
                            this.statusCreate = true
                        }
        
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
            
                

        //    this.$store.dispatch('createUser', this.user)
           
        },
        // getUserTest : async function() {
        //     const response =  await axios.get("http://127.0.0.1:8000/api/user/list?search=")
        //     this.listUserTest = response.data
        // },
        onImageChange: function(event) {
            this.user.avatar = event.target.files[0];
        },
        // createImage(file) {
        //     let reader = new FileReader();
        //     let vm = this;
        //     reader.onload = (e) => {
        //         vm.user.avatar = e.target.result;
        //     };
        //     reader.readAsDataURL(file);
        // },
        ...mapActions(['getUser'])
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
.btn-add {
    float: right;
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