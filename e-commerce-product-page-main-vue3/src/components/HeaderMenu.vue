<template>
  <div class="menu" :class="{'side' : showSideMenu}">
    <ul>
      <img src="../assets/icon-close.svg" alt="" class="close-icon" @click="closeSideMenu">
      <li><a href="#">Collections</a></li>
      <li><a href="#">Men</a></li>
      <li><a href="#">Women</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
</template>

<script setup>
import {defineProps, ref , watch , defineEmits} from "vue";

const props = defineProps({showSideMenu:Boolean})
const emit = defineEmits(['closeSideMenu'])
let showSideMenu = ref(props.showSideMenu)

watch(() => props.showSideMenu, (newValue, oldValue) => {
  showSideMenu.value = newValue
});

function closeSideMenu(){
  showSideMenu.value = false
  emit('closeSideMenu')
}
</script>

<style scoped>
ul{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 32px;
  margin-left: 40px;
}

ul li{
  position: relative;
}

ul li a{
  color: #1d2025;
  opacity: 0.5;
  font-weight: 700;
}

ul li:hover::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: -48px;
  left: 0;
  background-color: #ff7d1a;

}
.close-icon {
  display: none;
}

/* Media Queries */
@media (max-width: 800px) {
  .menu {
    display: none;
  }

  .menu.side {
    display: block;
    background-color: rgba(0, 0, 0, 0.75);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
  }

  menu.side .close-icon {
    display: block;
    margin-bottom: 20px;
  }

  .menu.side ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 24px;
    padding: 20px;
    margin-left: 0;
    background-color: white;
    width: 65%;
    height: 100%;
  }

  .menu.side ul li a{
    opacity: 1;
  }

  .menu.side .close-icon {
    display: block;
    margin-bottom: 20px;
  }
}
</style>
