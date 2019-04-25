import Vue from "vue";
import VeeValidate from "vee-validate";

import VueI18n from "vue-i18n";
import zh_CN from "vee-validate/dist/locale/zh_CN";

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