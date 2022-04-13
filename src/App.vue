<template>
  <div id="app">
    <div class="abcd">
            <div class="menu-left pt-5">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <router-link to="/list/user">Active</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                        
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                        
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                    </li>
                    
                </ul>
            </div>
            <div class="content-right">
                <router-view />
            </div>
        </div>
  </div>
</template>

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
