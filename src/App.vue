<template>
  <div class="container app">
    <app-header></app-header>
    <div class="container-smrow">
      <div class="col-xs-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    appHeader: Header
  },
  created() {
    this.$router.push('country');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.negrito {
  font-weight: bold
}

.content-table {
   padding-top: 30px;
   overflow-x: auto;
   font-size: 14px;
 }

 .content-table-footer {
    font-size: 11px;
    text-align: left;
 }
 .colnum {
   text-align: right;
 }
 
 .footer {
   text-align: left;
 }

  
tr:nth-child(odd) {
  
  background-color: rgba(0,0,0,0.075);
 }

 


</style>
