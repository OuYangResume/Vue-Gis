<template>
  <div>
    <div class="fromdata">
      <div class="fromItem">
        <input
          name="name"
          type="text"
          v-model="fromData.name"
          placeholder=" 请输入姓名"
          v-validate="'required|chinese'"
          data-vv-as="姓名"
        >
        <span v-show="errors.has('name')" class="help">{{ errors.first('name') }}</span>
      </div>
      <div class="fromItem">
        <input
          name="age"
          type="text"
          v-model="fromData.age"
          placeholder="年龄"
          v-validate="'required'"
        >
        <span v-show="errors.has('age')" class="help">{{ errors.first('age') }}</span>
      </div>
      <div class="fromItem">
        <input
          name="tel"
          type="text"
          v-model="fromData.tel"
          placeholder="电话号码"
          v-validate="'mobile'"
        >
        <span v-show="errors.has('tel')" class="help">{{ errors.first('tel') }}</span>
      </div>
      <button @click="commitData">提交</button>
    </div>
    <div class="fromdata">
      <div class="fromItem">
        <input
          name="name1"
          type="text"
          v-model="fromData1.name"
          placeholder=" 请输入姓名"
          v-validate="'required'"
          data-vv-as="姓名"
          data-vv-scope="form_1"
        >
        <span v-show="errors.has('form_1.name1')" class="help">{{ errors.first('form_1.name1') }}</span>
      </div>
      <div class="fromItem">
        <input
          name="age1"
          type="text"
          v-model="fromData1.age"
          placeholder="年龄"
          v-validate="'required'"
          data-vv-scope="form_2"
        >
        <span v-show="errors.has('form_2.age1')" class="help">{{ errors.first('form_2.age1') }}</span>
      </div>
      <div class="fromItem">
        <input
          name="tel1"
          type="text"
          v-model="fromData1.tel"
          placeholder="电话号码"
          v-validate="'mobile'"
          data-vv-scope="form_1"
        >
        <span v-show="errors.has('form_1.tel1')" class="help">{{ errors.first('form_1.tel1') }}</span>
      </div>
      <button @click="commitData1">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromData: {
        name: "",
        age: "",
        tel: ""
      },
      fromData1: {
        name: "",
        age: "",
        tel: ""
      }
    };
  },
  methods: {
    commitData() {
      this.$validator.validateAll().then(result => {
        if (result) {
          
          alert("验证通过");
          return;
        }
        alert("请检查表单");
      });
    },
    commitData1() {
      this.$validator.validate("form_1.*").then(result => {
        if (result) {
          
          alert("验证通过");
          return;
        }
        alert("请检查表单");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fromdata {
  display: flex;
  flex-direction: column;
  align-items: center;
  .fromItem {
    display: flex;
    flex-direction: row;
    input {
      height: 30px;
      width: 200px;
    }
  }
}
</style>

