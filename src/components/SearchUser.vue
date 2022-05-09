<template>
  <div>
      <nav class="navbar navbar-light bg-light">
        <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="title">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click.prevent="searchUser()">Search</button>
        </form>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'SearchUser',
    data(){
        return {
            title: ''
        }
    },
    methods: {
        searchUser: function() {
            this.$emit('search-user', this.title);
        }
    }
}
</script>

<style>

</style>