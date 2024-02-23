import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Checkbox from "primevue/checkbox";
import VirtualScroller from "primevue/virtualscroller";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";

import "./index.css";
import "primevue/resources/themes/aura-light-purple/theme.css";

const pinia = createPinia();
const app = createApp(App);

app.component("Checkbox", Checkbox);
app.component("VirtualScroller", VirtualScroller);
app.component("IconField", IconField);
app.component("InputIcon", InputIcon);
app.component("InputText", InputText);

app.use(pinia);
app.use(PrimeVue);
app.mount("#app");
