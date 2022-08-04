<template>
  <div class="add-product">
    <div class="amount">
      <base-button class="icon" @click="decreaseItemsAmount">
        <img src="../assets/icon-minus.svg" alt="" class="minus">
      </base-button>
      <p id="product-amount">{{ itemsAmount }}</p>
      <base-button class="icon" @click="increaseItemsAmount">
        <img src="../assets/icon-plus.svg" alt="" class="plus">
      </base-button>
    </div>
    <base-button class="add-to-cart-btn" @click="addItemToCart">
      <img src="../assets/icon-cart.svg" alt="" class="cart-img" > Add to cart
    </base-button>
  </div>
</template>

<script setup>
import BaseButton from "@/components/BaseButton";
import {ref , defineEmits} from "vue";

let itemsAmount = ref(0)
const emit = defineEmits(['addItem'])

function decreaseItemsAmount(){
  itemsAmount.value = (itemsAmount.value === 0  || itemsAmount.value < 0 ) ? 0 : (itemsAmount.value - 1)
}

function increaseItemsAmount(){
  itemsAmount.value =  itemsAmount.value + 1
}

function addItemToCart(){
  if(itemsAmount.value > 0)
    emit('addItem', itemsAmount);
}

</script>

<style scoped>
.add-product {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 16px;
}

.amount {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  width: 35%;
  background-color: #f7f8fd;
  padding: 12px;
  border-radius: 7px;
  font-weight: 700;
  font-size: 15px;
}

.cart-img {
  filter: brightness(5);
}

.add-to-cart-btn{
  gap: 8px;
  width: 65%;
  box-shadow: 1px 20px 10px 0px #ffede0;
}

/* MEDIA QUERIES */
@media (max-width: 500px) {
  .add-product {
    flex-direction: column;
    gap: 16px;
  }

  .amount {
    width: 100%;
  }

  .add-to-cart-btn {
    width: 100% ;
  }
}

</style>
