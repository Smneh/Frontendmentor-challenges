<template>
  <div class="item">
    <img :src="getImgUrl(item.imagesArray[0])" alt="" class="item-img">
    <div class="info">
      <p class="item-title">{{ item.name}}</p>
      <p class="item-cost">
        <span class="price">${{ item.price }}</span> x
        <span class="amount">{{ item.amount }}</span>
        <span class="total-price">${{ item.price * item.amount }}</span>
      </p>
    </div>
    <base-button class="item-delete-btn gray-btn icon" @click="removeItem">
      <img src="../assets/icon-delete.svg" alt="" >
    </base-button>
  </div>
</template>

<script setup>
import BaseButton from "@/components/BaseButton";
import {defineProps , defineEmits} from "vue";
import {useGetUrl} from "@/composables/useGetUrl";

let props = defineProps({item:Object})
const emit = defineEmits(['removeItem'])
let {getImgUrl} = useGetUrl()

function removeItem(){
    emit('removeItem' , props.item);
}

</script>

<style>
.item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 16px;
  width: 100%;
  padding: 20px 20px 0 20px;
}

.item-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

.item p {
  width: max-content;
  color: #68707d;
}

.item-cost span {
  margin-right: 4px;
}

.total-price {
  color: #1d2025;
  font-weight: 700;
}

.item-delete-btn {
  margin: auto 0 auto auto;
}

/* Media Queries */
@media (max-width: 500px) {
  .item {
    gap: 8px;
  }
}
</style>
