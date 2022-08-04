<template>
  <button class="btn">
    <slot/>
  </button>
</template>

<style >
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background-color: #ff7d1a;
  color: white;
  cursor: pointer;
  border: none;
  padding: 16px;
  font-family: inherit;
  border-radius: 7px;
  font-weight: 500;
  font-size: 15px;
}

.btn:hover{
  opacity: 0.6;
}

.gray-btn:hover img{
  filter: contrast(1) brightness(0);
  opacity: 1;
}

/* ICONS */
.icon{
  background-color: transparent;
  padding: 0;
}

.icon:hover{
  opacity: 1;
}

.control-icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

</style>