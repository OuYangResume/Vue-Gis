import Vue from "vue";
import VeeValidate from "vee-validate";

import VueI18n from "vue-i18n";
import zh_CN from "vee-validate/dist/locale/zh_CN";
import { Validator } from "vee-validate";

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: "zh_CN"
});
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: "validation",
  dictionary: {
    zh_CN
  }
});

/*自定义方法*/

Validator.extend("mobile", {
  getMessage: field => "电话号码格式不正确",
  validate: value =>
      value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
});

Validator.extend("chinese", {
  getMessage: field => "只能填写中文",
  validate: value =>
      /[^\u0000-\u00FF]/.test(value)
});

/*自定义错误消息*/
const Dictionary = {
  zh_CN: {
      messages: {
          required: (field) => field+"是必填项。",
      },
      attributes: {
          email: "邮箱",
          mobile: '电话号码',
          idCard: "身份证号码",
      }
  }
};
// 自定义validate error 信息
Validator.localize(Dictionary);