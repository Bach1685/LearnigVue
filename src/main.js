import { createApp } from "vue";
import router from "./router/router";
import App from "./App.vue";
import components from "./components/UI";
import directives from "./directives";

const app = createApp(App);
components.forEach((component) => app.component(component.name, component));
directives.forEach((directive) => app.directive(directive.name, directive));
app.component();
app.use(router);
app.mount("#app");
