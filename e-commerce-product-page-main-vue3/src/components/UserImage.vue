<template>
  <div>
    <img src="../assets/image-avatar.png">
  </div>
</template>

<style scoped>
img{
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid white;
}

img:hover{
  border-color: #ff7d1a;
}

@media (max-width: 500px) {
  img {
    width: 40px;
    height: 40px;
  }
}

</style>