import { createApp } from "vue";
import router from "./router/router";
import App from "./App.vue";
import components from "./components/UI";
import VIntersection from "./directives/VIntersection";

const app = createApp(App);
components.forEach((component) => app.component(component.name, component));
app.directive("intersection", VIntersection);
app.component();
app.use(router);
app.mount("#app");
