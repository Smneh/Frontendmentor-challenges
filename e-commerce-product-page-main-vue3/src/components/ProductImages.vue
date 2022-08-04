<template>
  <div class="product-images">
    <div class="product-img large">
      <img class="img-large" :src="getImgUrl(productImages[activeThumbnail].replace('-thumbnail' , ''))" @click="showModal"/>
      <base-button class="icon control-icon prev" @click="showPreviousImage"  >
        <img src="../assets/icon-previous.svg" alt="">
      </base-button>
      <base-button class="icon control-icon next" @click="showNextImage" >
        <img src="../assets/icon-next.svg" alt="">
      </base-button>
    </div>
    <div class="thumbnails-container">
      <div v-for="(image , index) in productImages" :class="{'active' : isActive(image)}" :key="index" class="thumbnail"  @click="changeMainImage(image)">
        <img :src="getImgUrl(image)" />
        <div class="overlay"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits , watch} from "vue"
import {useGetUrl} from "@/composables/useGetUrl";
import {usePreviousImage} from "@/composables/usePreviousImage";
import {useNextImage} from "@/composables/useNextImage";
import BaseButton from "@/components/BaseButton";

const emit = defineEmits(['showModal'])
const props = defineProps({productImages:Array , activeThumbnail:Number})
const productImages = props.productImages
let activeThumbnail = ref(0)
const {getImgUrl} = useGetUrl()
const {previousImage} = usePreviousImage()
const {nextImage} = useNextImage()

watch(() => props.activeThumbnail, (newValue, oldValue) => {
  activeThumbnail.value = newValue
});

function changeMainImage(image){
    activeThumbnail.value = productImages.indexOf(image)
}

function isActive(img){
  return activeThumbnail.value === productImages.indexOf(img)
}

function showModal(){
  if(!(screen.width < 500))
      emit('showModal')
}

function showNextImage(){
  activeThumbnail.value = nextImage(activeThumbnail.value , props.productImages)
}

function showPreviousImage(){
  activeThumbnail.value = previousImage(activeThumbnail.value , props.productImages)
}

</script>

<style scoped>
.product-images {
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 20px;
}

.img-large {
  height: 400px;
  cursor: pointer;
  width: 100%;
  position: relative;
  border-radius: 10px;
}

.thumbnails-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 16px;
  width: 100%;
  z-index: 9;
}

.thumbnail {
  border-radius: 10px;
  overflow: hidden;
  display: block;
  width: 88px;
  height: 88px;
  cursor: pointer;
  position: relative;
  opacity: 1;
  transition: .5s ease;
  backface-visibility: hidden;
}

.thumbnail img {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.thumbnail:hover img,
.thumbnail.active img{
  opacity: 0.5;
}

.overlay{
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid transparent;
}

.thumbnail:hover .overlay,
.thumbnail.active .overlay{
  opacity: 1;
}

.thumbnail.active .overlay{
  border-color: #ff7d1a;
}

.product-images.modal {
  position: relative;
}

.product-images.modal .overlay{
  background: rgba(255, 255, 255, 0.6);
}

.control-icon{
  display: none;
}

/* Media Queries */
@media (max-width: 800px) {
  .product-images {
    width: 480px;
    flex-direction: row;
  }

  .thumbnails-container {
    flex-direction: column;
    width: max-content;
  }

  .product-images.modal {
    width: 400px;
    flex-direction: column;
  }

  .product-images.modal .thumbnails-container{
    flex-direction: row;
  }
}

@media (max-width: 500px) {
  .product-images {
    width: 100%;
  }

  .product-img.large{
    width: 100%;
    position: relative;
  }

  .img-large {
    border-radius: 0;
    height: 100%;
  }

  .control-icon {
    display: flex;
    position: absolute;
    top: 50%;
  }

  .control-icon.next{
    right: 20px;
  }

  .control-icon.prev{
    left: 20px;
  }

  .thumbnails-container {
    display: none;
  }

}
</style>


