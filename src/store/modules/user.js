import axios from 'axios'

const User = {
    state: {
        counts: [],
        listUser: [],
        listUserDelete: [],
        userUpdate: []
    },

    getters: {
        countUser: state => state.count,
        listUser: state => state.listUser,
        listUserDelete: state => state.listUserDelete,
        userUpdate: state => state.userUpdate
    },

    actions: {
        async getCount({commit}) {
            try {
                // const response =  await axios.post("http://127.0.0.1:8000/api/user/dashboard",{headers: {Authorization: 'Bearer ' + this.token}})
                const response =  await axios.post("http://127.0.0.1:8000/api/user/dashboard")
                // console.log(response.data)
                commit('SET_TODOS', response.data)
            } catch (error) {
                console.log(error)
            }
            
        },
        async getUser({commit}, data)
        {
            if(data) {
                try {
                    // const response =  await axios.post("http://127.0.0.1:8000/api/user/dashboard",{headers: {Authorization: 'Bearer ' + this.token}})
                    const response =  await axios.get(`http://127.0.0.1:8000/api/user/list?search=${data}`)
                    // console.log(response.data)
                    commit('SET_LISTUSER', response.data)
                } catch (error) {
                    console.log(error)
                }
            }
            else
            {
                try {
                    // const response =  await axios.post("http://127.0.0.1:8000/api/user/dashboard",{headers: {Authorization: 'Bearer ' + this.token}})
                    const response =  await axios.get("http://127.0.0.1:8000/api/user/list?search=")
                    // console.log(response.data)
                    commit('SET_LISTUSER', response.data)
                } catch (error) {
                    console.log(error)
                }
            }
            
        },

        async getUserDelete({commit})
        {
            try {
                const response =  await axios.get('http://127.0.0.1:8000/api/user/list/delete')
                commit('SET_LISTUSER_DELETE', response.data)
            } catch (error) {
                console.log(error)
            }
        },

        async delSoftUser({commit}, id)
        {
            try {
                console.log(id);
                await axios.post('http://127.0.0.1:8000/api/user/soft/delete',{id})
                commit('DELETE_USER', id)
            } catch (error) {
                console.log(error)
            }
        },

        async delSoftAllUser({commit}, id) {
            try {
                await axios.post('http://127.0.0.1:8000/api/user/soft/delete/list',{id})
                commit('DELETE_ALL_USER', id)
            } catch (error) {
                console.log(error)
            }
        },

        async restoreUser({commit}, id) 
        {
            try {
                await axios.post('http://127.0.0.1:8000/api/user/restore',{id})
                commit('RESTORE_USER', id)
            } catch (error) {
                console.log(error)
            }
        },

        async createUser ({commit}, data) 
        {
            try {
                const userFormData = new FormData();
            
                userFormData.append('first_name', data.firstName);
                userFormData.append('last_name', data.lastName);
                userFormData.append('email', data.email);
                userFormData.append('role_id', data.role);
                userFormData.append('password', data.password);
                userFormData.append('password_confirmation', data.paswordConfirm);
                userFormData.append('avatar', data.avatar);

                const response = await axios.post('http://127.0.0.1:8000/api/user/insert',
                    userFormData, 
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                // console.log(response.data);
                return response.data;
                
            } catch (error) {
                return error
                console.log(error)
            }
        },

        async updateUser({commit}, data)
        {
            try {
                const userFormData = new FormData();
            
                userFormData.append('first_name', data.first_name);
                userFormData.append('last_name', data.last_name);
                userFormData.append('email', data.email);
                userFormData.append('role_id', data.role_id);
                userFormData.append('id', data.id);

                await axios.post('http://127.0.0.1:8000/api/user/update',
                    userFormData
                )
                // console.log(response.data);
            } catch (error) {
                console.log(error)
            }
        },
         
    },

    mutations: {
        SET_TODOS(state, counts) {
            state.counts = counts
        },
        SET_LISTUSER(state, listUser)
        {
            state.listUser = listUser
        },
        DELETE_USER(state, id) {
            state.listUser = state.listUser.filter(user => user.id !== id)
        },
        DELETE_ALL_USER(state,id){
            state.listUser = state.listUser.filter(user => id.includes(user.id) == false)
        },

        SET_LISTUSER_DELETE(state, listUserDelete) 
        {
            state.listUserDelete = listUserDelete
        },

        RESTORE_USER(state, id) 
        {
            state.listUserDelete = state.listUserDelete.filter(user => user.id !== id)
        },

        HANDLE_UPDATE_USER(state, data)
        {
            state.userUpdate = data
        }
        
        
    }
}

export default User