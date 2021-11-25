import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import {VueClipboard} from 'vue-easy-clipboard'
import './index.css'

createApp(App)
	.use(VueClipboard)
	.use(Toast)
	.mount('#app')
