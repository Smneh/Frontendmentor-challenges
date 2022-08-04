<template>
  <div class="light-box" :style="{ 'height' : boxHeight + 'px'}">
    <div class="light-box-content">
      <slot/>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.light-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;
}

.light-box-content{
  position: relative;
}

</style>

<script setup>
import {onMounted, ref} from "vue";
let boxHeight = ref(0)

const mounted = onMounted(()=>{
  boxHeight.value = document.body.scrollHeight
})
</script>