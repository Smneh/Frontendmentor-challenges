<template>
  <div class="container">
    <product-component  :product="product" />
  </div>
</template>
<script setup>
import ProductComponent from "@/components/ProductComponent";
let product = {
  id:"1",
  company: "Sneaker Company",
  name: "Fall Limited Edition Sneakers",
  description:"These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  price: 250,
  discount: 50,
  imagesArray:["image-product-1-thumbnail.jpg","image-product-2-thumbnail.jpg","image-product-3-thumbnail.jpg","image-product-4-thumbnail.jpg"]
};
</script>

<style scoped>
/* Media Queries */
@media (max-width: 500px) {
  .container{
    margin: 0 ;
  }
}
</style>