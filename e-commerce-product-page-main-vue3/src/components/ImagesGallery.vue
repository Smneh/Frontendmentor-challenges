<template>
  <light-box @scroll.prevent  @wheel.prevent @touchmove.prevent>
    <base-button class="icon close-icon" @click="closeModal">
      <img src="../assets/icon-close.svg" alt="">
    </base-button>
    <product-images class="modal" :productImages="productImages" :active-thumbnail="activeThumbnail" />
    <base-button class="icon control-icon prev" @click="showPreviousImage" >
      <img src="../assets/icon-previous.svg" alt="">
    </base-button>
    <base-button class="icon control-icon next" @click="showNextImage">
      <img src="../assets/icon-next.svg" alt="">
    </base-button>
  </light-box>
</template>

<script setup>
import LightBox from "@/components/LightBox";
import ProductImages from "@/components/ProductImages";
import {defineProps , ref , defineEmits } from "vue";
import BaseButton from "@/components/BaseButton";
import {usePreviousImage} from "@/composables/usePreviousImage";
import {useNextImage} from "@/composables/useNextImage";

let props = defineProps({productImages:Array})
let activeThumbnail = ref(0)
const emit = defineEmits(['closeModal'])
const {previousImage} = usePreviousImage()
const {nextImage} = useNextImage()

function showNextImage(){
  activeThumbnail.value = nextImage(activeThumbnail.value , props.productImages)
}

function showPreviousImage(){
  activeThumbnail.value = previousImage(activeThumbnail.value , props.productImages)
}

function closeModal(){
  emit('closeModal')
}
</script>

<style scoped>
.close-icon {
  cursor: pointer;
  filter: brightness(5);
  position: absolute;
  top: -25px;
  right: 3px;
  width: 20px;
  height: 20px;
}

.close-icon:hover {
  filter: invert(48%) sepia(85%) saturate(986%) hue-rotate(345deg) brightness(105%) contrast(110%);
}

.control-icon{
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
}

.control-icon.next {
  right: -12%;
}

.control-icon:hover img {
  filter: invert(48%) sepia(85%) saturate(986%) hue-rotate(345deg) brightness(105%) contrast(110%);
}
</style>


