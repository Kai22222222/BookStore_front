import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// Nhập CSS tùy chỉnh sau cùng để đảm bảo ghi đè được các lớp CSS khác
import './assets/main.css';

// Khởi tạo Vue app
const app = createApp(App);

app.use(router);
app.mount('#app');