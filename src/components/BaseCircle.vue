<template>
  <div>
    <slot> </slot>
  </div>
</template>

<style scoped>
div {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  box-shadow: 0 0 3px #0006;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
div:hover {
  background-color: beige;
}
</style>
