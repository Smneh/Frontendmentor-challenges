<template>
  <div class="cart-container">
    <base-button class="icon gray-btn cart-icon" @click="this.showCart = !this.showCart">
      <img src="../assets/icon-cart.svg" alt="" >
      <div v-show="cartItemsAmount > 0" class="number">{{cartItemsAmount}}</div>
    </base-button>
    <div class="cart-wrapper" v-show="showCart">
      <div class="cart">
        <p class="cart-title">Cart</p>
        <div class="cart-items">
          <p v-if="cartIsEmpty()" class="cart-empty">Your cart is empty.</p>
          <cart-item v-for="item in cartItems" :item="item" @removeItem="removeItemFromCart"/>
        </div>
        <base-button v-if="!cartIsEmpty()" class="checkout-btn">Checkout</base-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CartItem from "@/components/CartItem";
import { ref , computed } from 'vue'
import BaseButton from "@/components/BaseButton";
import {useStore} from "vuex";

const store = useStore()
const cartItems = ref(store.state.cart)
let showCart = ref(false)

const cartItemsAmount = computed(() => cartItems.value.length)

function cartIsEmpty(){
  return cartItems.value.length === 0
}

function removeItemFromCart(item){
  store.dispatch('removeItemFromCart', item)
}
</script>

<style scoped>

.number {
  position: absolute;
  background-color: #ff7d1a;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 50%;
  font-size: 10px;
  color: white;
  top: -40%;
  right: -40%;
}

.cart {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  position: absolute;
  background-color: white;
  transform: translate(-50%, -50%);
  min-width: 350px;
  max-height: 260px;
  overflow-y: auto;
  top: 140px;
  left: -74px;
  border-radius: 10px;
  box-shadow: 0px 21px 36px -2px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.cart-title {
  padding: 20px;
  border-bottom: 1px solid #b6bcc8;
  width: 100%;
  font-size: 15px;
  font-weight: 700;
}

.cart-items {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 32px;
  width: 100%;
}

.cart-empty {
  padding: 68px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  color: #68707d;
}

.checkout-btn {
  width: calc(100% - 40px);
  margin: 20px;
}

.cart-wrapper{
  position: absolute;
}

.cart-icon{
  position: relative;
}

/* Media Queries */
@media (max-width: 500px) {
  .cart-wrapper{
    width: 100%;
    top: 66%;
    left: 50%;
  }

  .cart {
    width: 96%;
    top: 0;
    left: 0;
  }
}
</style>
