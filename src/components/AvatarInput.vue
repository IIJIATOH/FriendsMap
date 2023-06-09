<template>
  <input
    v-show="false"
    type="file"
    accept="image/*"
    ref="file"
    @change="change"
  />
  <img :src="src" alt="Avatar" />
  <button @click="browse">Browse</button>
  <button @click="check">Check</button>
</template>
<script>
export default {
  props: ["modelValue"],
  data() {
    return {
      src: null,
      file: null
    };
  },
  methods: {
    browse() {
      this.$refs.file.click();
    },
    change(e) {
      this.file = e.target.files[0];
      this.$emit("update:modelValue", e.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        this.src = e.target.result;
      };
    },
    check() {
      console.log(this.modelValue);
      if (this.modelValue == null) return;
      else {
        console.log("checking");
        let reader = new FileReader();
        reader.readAsDataURL(this.modelValue);
        reader.onload = (e) => {
          this.src = e.target.result;
        };
      }
    }
  }
};
</script>
<style>
img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}
</style>
