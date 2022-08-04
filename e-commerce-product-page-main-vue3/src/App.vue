<template>
  <home-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Kumbh Sans';
  font-size: 16px;
  color: #1d2025;
  overflow-x: hidden;
}

.container {
  max-width: 1220px;
  margin: 0 auto;
}

a{
  text-decoration: none;
}

ul{
  list-style: none;
}


/* Media Queries */
@media (max-width: 1220px) {
  .container {
    margin: 0 16px;
  }
}

/*@media (max-width: 500px) {*/
/*  .container {*/
/*    padding-top: 0;*/
/*    margin: 0;*/
/*  }*/
/*}*/

</style>

<script setup>
import HomeView from "@/views/HomeView";

</script>
