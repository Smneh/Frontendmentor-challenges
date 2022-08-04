<template>
  <div class="product-info">
    <p class="company-name">{{ product.company }}</p>
    <h1 class="product-name">{{ product.name }}</h1>
    <p class="description">{{product.description}}</p>
    <div class="price">
      <div class="price-discount">
        <h2>${{ finalPrice.toFixed(2) }}</h2>
        <p class="discount">{{ product.discount }}%</p>
      </div>
      <div class="price-original">
        <p>${{ product.price.toFixed(2) }}</p>
      </div>
    </div>
    <add-to-cart @addItem="addItemToCart"/>
  </div>
</template>

<script setup>
import AddToCart from "@/components/AddToCart";
import { computed , defineProps} from "vue"
import {useStore} from "vuex";

let props = defineProps({product:Object})
const store = useStore()
const product = props.product

const finalPrice = computed(()=>{
     return product.price * (product.discount/100)
})

function addItemToCart(amount){
  store.dispatch('addItemToCart' , {itemToAdd:product , amount:amount.value})
}

</script>

<style scoped>
.product-info{
  width: 40%;
}

.company-name{
  text-transform: uppercase;
  color: #ff7d1a;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 700;
  margin-bottom: 16px;
}

.product-name{
  font-size: 38px;
  margin-bottom: 32px;
}

.description{
  color: #68707d;
  line-height: 1.6;
  margin-bottom: 16px;
}

.price{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.price-discount{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 16px;
  margin-bottom: 8px;
}

.discount {
  background-color: #ffede0;
  width: 50px;
  padding: 4px 0;
  border-radius: 5px;
  text-align: center;
  color: #ff7d1a;
  font-weight: 700;
}

.price-original {
  color: #b6bcc8;
  font-size: 15px;
  position: relative;
  width: max-content;
  font-weight: 500;
  margin-bottom: 32px;
}

.price-original::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  top: 50%;
  left: 0;
  background-color: #b6bcc8;
}

/* Media Queries */
@media (max-width: 960px) {
  .product-info {
    width: 50%;
  }
}

@media (max-width: 800px) {
  .product-info {
    width: 480px;
  }
}

@media (max-width: 500px) {
  .product-info {
    width: 100%;
    padding: 0 20px;
  }

  .price {
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    margin-bottom: 16px;
  }

  .price-original ,
  .price-discount{
    margin-bottom: 0;
  }
}

</style>
