<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option of options" :key="option.value"></option>
  </select>
</template>
<script>
export default {
  name: "my-select",
  props: {
    modelValue: {
      type: String,
    },
    option: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event);
    },
  },
};
</script>