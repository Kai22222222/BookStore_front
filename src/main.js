import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from "./router";
import { createPinia } from 'pinia'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// Nhập CSS tùy chỉnh sau cùng để đảm bảo ghi đè được các lớp CSS khác
import './assets/main.css';

// Khởi tạo Vue app
const pinia = createPinia();
const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(pinia);
app.use(router);
app.mount('#app');