import "./assets/main.css";

import { createApp } from "vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";
import * as MdIcons from "oh-vue-icons/icons/md";
import * as GiIcons from "oh-vue-icons/icons/gi";
import * as BiIcons from "oh-vue-icons/icons/bi";

import App from "./App.vue";
import router from "./router/index";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const Fa = Object.values({ ...FaIcons });
const Md = Object.values({ ...MdIcons });
const Gi = Object.values({ ...GiIcons });
const Bi = Object.values({ ...BiIcons });
addIcons(...Fa, ...Md, ...Gi, ...Bi);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.use(router);
app.use(Toast);

app.mount("#app");
