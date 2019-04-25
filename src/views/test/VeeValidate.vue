<template>
  <div class="fromdata">
    <div>
      <input name="name" type="text" v-model="name" placeholder="姓名" v-validate="'required'">
      <span v-show="errors.has('name')" class="help">{{ errors.first('name') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.fromdata {
  display: flex;
}
</style>

