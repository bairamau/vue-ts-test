import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "reflect-metadata";
import "vue-class-component/hooks";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueI18n);

const messages = {
  en: {
    keys: "Keys",
    fruits: "Fruits"
  },
  ru: {
    keys: "Ключи",
    fruits: "Фрукты"
  }
};

const i18n = new VueI18n({
  locale: "ru",
  messages
});

new Vue({
  router,
  store,
  render: h => h(App),
  i18n
}).$mount("#app");
