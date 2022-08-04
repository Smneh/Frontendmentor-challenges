<template>
  <div class="product-container">
    <images-gallery v-if="showProductModal" :productImages="product.imagesArray" @closeModal="closeModal"/>
    <product-images :productImages="product.imagesArray" @showModal="showModal" :active-thumbnail="activeThumbnail"/>
    <product-info :product="product"/>
  </div>
</template>

<script setup>
import ProductInfo from "@/components/ProductInfo";
import ProductImages from "@/components/ProductImages";
import ImagesGallery from "@/components/ImagesGallery";
import {ref, onMounted, onBeforeUnmount} from "vue";

const props = defineProps({product:Object})

let showProductModal = ref(false)
let activeThumbnail = ref(0)

function showModal(){
  showProductModal.value = true
}

function closeModal(){
  showProductModal.value = false
}

const mounted = onMounted(()=>{
    window.addEventListener('resize', onResize);
})

const beforeDestroy = onBeforeUnmount(()=>{
    window.removeEventListener('resize', onResize);
})

function onResize(){
  if(screen.width < 500)
    closeModal()
}

</script>

<style>
.product-container{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: nowrap;
  padding: 52px 0;
  gap: 16px;
}

/* Media Queries */
@media (max-width: 800px) {
  .product-container {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 500px) {
  .product-container {
    padding-top: 0;
  }
}
</style>