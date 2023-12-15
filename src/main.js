import App from './App.vue'
import './styles/index.css'
import router from './router.js'
import { createApp } from 'vue';

const app = createApp(App);
app.use(router);
app.mount('#app');
