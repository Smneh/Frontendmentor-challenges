<template>
  <header>
    <div class="container">
        <nav class="navbar">
          <img src="../assets/icon-menu.svg" alt="" class="menu-icon" @click="showMenu">
          <logo/>
          <header-menu :showSideMenu="showSideMenu" @closeSideMenu="closeMenu"/>
          <div class="user">
            <user-cart/>
            <user-image/>
          </div>
        </nav>
    </div>
  </header>
</template>
<script setup>
import Logo from "@/components/Logo";
import HeaderMenu from "@/components/HeaderMenu";
import UserImage from "@/components/UserImage";
import UserCart from "@/components/UserCart";
import {ref} from "vue";

let showSideMenu = ref(false)

function showMenu(){
  showSideMenu.value = true
}

function closeMenu(){
  showSideMenu.value = false
}
</script>

<style>
.navbar{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 28px 0;
  border-bottom: 2px solid #e9eaec;
}
.user{
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 28px;
}

.menu-icon {
  display: none;
}

/* Media Queries */
@media (max-width: 800px) {
  .menu-icon {
    display: block;
    margin-right: 16px;
  }
}

@media (max-width: 500px) {
  .navbar {
    border: 0;
  }
  .user {
    gap: 16px;
  }
}
</style>