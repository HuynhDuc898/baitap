<template>
  <tr>
        <!-- <td ><input type="checkbox" @change="handleSelectUser(userProps.id)"></td> -->
        <td>{{userProps.name}}</td>
        <td>{{userProps.email}}</td>
        <td>{{userProps.role.name}}</td>
        <td>
            <button class="btn btn-success btn-restore" @click.prevent="restoreUser(userProps.id)">Restore</button>
        </td>
    </tr>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

export default {
    name: 'UserItemDelete',
    props: ['userProps'],
    methods: {
        ...mapActions(['restoreUser']),
        // handleSelectUser: function(userId) {
        //     this.$emit('select', userId);
        // }
    }
}
</script>

<style scoped>

td, th {
    text-align: left;
    padding: 10px;
}
</style>