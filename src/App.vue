<template>
	<div class="flex flex-col h-full w-full justify-center items-center p-4 my-8">
		<h1 class="text-4xl mb-14 flex flex-row gap-3">
			<a href="https://zencod.ru/articles/" target="_blank" class="hover:opacity-50 transition-opacity" title="zencod.ru">
				<img src="/favicon.svg" alt="logo zencod.ru" width="40" height="40">
			</a>
			Генератор паролей
		</h1>
		<div class="flex flex-col">
			<label v-for="symbol in symbols">
				<input v-model="symbol.value" type="checkbox" class="form-checkbox text-yellow-500 rounded">
				{{ symbol.name }} <code>({{ symbol.symbols }})</code>
			</label>

			<div class="flex flex-row gap-4 justify-between items-center mt-5">
				<div class="flex flex-row items-center gap-3">
					Кол-во символов в пароле:
					<select v-model="lengthPass.value" class="rounded transition-colors bg-gray-800 hover:bg-gray-700 p-1 cursor-pointer">
						<option v-for="num in lengthPass.length" :key="num+'select'">{{ num }}</option>
					</select>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4 mt-12 w-full items-end">
			<div class="flex flex-row justify-between gap-4 w-full">
				<button v-if="!password" @click="generatePassword()" class="w-full flex flex-1 gap-2 justify-center px-4 py-2 rounded transition-colors bg-gray-800 hover:bg-gray-700">
					<svg  height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="fill-current"><rect height="2" rx="1" ry="1" width="8" x="8" y="2"/><path d="M5.50372,14.03693C5.50348,14.02435,5.5,14.01263,5.5,14a2,2,0,1,1,3.64459,1.135,2.364,2.364,0,0,0,.93469-.33911l.57147-.391a2.72244,2.72244,0,0,1,2.85718,0l.57147.391a2.72281,2.72281,0,0,0,2.85724,0l.57141-.391a2.4811,2.4811,0,0,1,1.481-.36993c.0025-.07867.01093-.1557.01093-.235a7.22506,7.22506,0,0,0-3.63788-6.31165A1.47039,1.47039,0,0,1,14.625,6.20386V3H9.375V6.20386a1.47039,1.47039,0,0,1-.73712,1.28448A7.22506,7.22506,0,0,0,5,13.8c0,.08258.00867.1629.01135.24481A2.8607,2.8607,0,0,1,5.50372,14.03693ZM14.5,10A1.5,1.5,0,1,1,13,11.5,1.5,1.5,0,0,1,14.5,10ZM11,7a1,1,0,1,1-1,1A1,1,0,0,1,11,7Z"/><path d="M13.5,3.5V5.55984a3.12619,3.12619,0,0,0,1.62088,2.74232,6.49477,6.49477,0,0,1-2.55656,12.16933A5.60413,5.60413,0,0,1,12,20.5a5.73662,5.73662,0,0,1-.58322-.03031A6.49468,6.49468,0,0,1,8.87914,8.30215,3.12617,3.12617,0,0,0,10.5,5.55984V3.5h3M15,2H9V5.55984a1.626,1.626,0,0,1-.84241,1.42725,7.99469,7.99469,0,0,0,3.12646,14.97672,7.09979,7.09979,0,0,0,1.43188,0A7.99469,7.99469,0,0,0,15.84241,6.98709,1.626,1.626,0,0,1,15,5.55984V2Z"/><circle cx="13" cy="18" r="1"/></svg>
					сгенерировать
				</button>
				<template v-else >
					<button @click="generatePassword()" class="w-full flex flex-1 gap-2 justify-center px-4 py-2 rounded transition-colors bg-gray-800 hover:bg-gray-700">
						<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="fill-current"><path d="M6 18.7V21a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H7.1A7 7 0 0 0 19 12a1 1 0 1 1 2 0 9 9 0 0 1-15 6.7zM18 5.3V3a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2h2.9A7 7 0 0 0 5 12a1 1 0 1 1-2 0 9 9 0 0 1 15-6.7z"/></svg>
						обновить
					</button>
					<button @click="copy(password)" class="w-full flex flex-1 gap-2 justify-center px-4 py-2 rounded transition-colors bg-gray-800 hover:bg-gray-700">
					<svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path d="M8,7 L8,8 L6.5,8 C5.67157288,8 5,8.67157288 5,9.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 C14.3284271,20 15,19.3284271 15,18.5 L15,17 L16,17 L16,18.5 C16,19.8807119 14.8807119,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,9.5 C4,8.11928813 5.11928813,7 6.5,7 L8,7 Z M16,4 L10.5,4 C9.67157288,4 9,4.67157288 9,5.5 L9,14.5 C9,15.3284271 9.67157288,16 10.5,16 L17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,7 L16.5,7 C16.2238576,7 16,6.77614237 16,6.5 L16,4 Z M20,6.52797748 L20,14.5 C20,15.8807119 18.8807119,17 17.5,17 L10.5,17 C9.11928813,17 8,15.8807119 8,14.5 L8,5.5 C8,4.11928813 9.11928813,3 10.5,3 L16.4720225,3 C16.6047688,2.99158053 16.7429463,3.03583949 16.8535534,3.14644661 L19.8535534,6.14644661 C19.9641605,6.25705373 20.0084195,6.39523125 20,6.52797748 Z M17,6 L18.2928932,6 L17,4.70710678 L17,6 Z M11.5,13 C11.2238576,13 11,12.7761424 11,12.5 C11,12.2238576 11.2238576,12 11.5,12 L13.5,12 C13.7761424,12 14,12.2238576 14,12.5 C14,12.7761424 13.7761424,13 13.5,13 L11.5,13 Z M11.5,11 C11.2238576,11 11,10.7761424 11,10.5 C11,10.2238576 11.2238576,10 11.5,10 L16.5,10 C16.7761424,10 17,10.2238576 17,10.5 C17,10.7761424 16.7761424,11 16.5,11 L11.5,11 Z M11.5,9 C11.2238576,9 11,8.77614237 11,8.5 C11,8.22385763 11.2238576,8 11.5,8 L16.5,8 C16.7761424,8 17,8.22385763 17,8.5 C17,8.77614237 16.7761424,9 16.5,9 L11.5,9 Z"/>
					</svg>
					копировать
				</button>
				</template>
			</div>
			<div :class="{ 'opacity-0': !password }" class="flex justify-center items-center w-full px-8 bg-yellow-500 rounded h-14 text-xl font-light"><code class="text-gray-900 ">{{ password }}</code></div>
		</div>
	</div>

</template>

<script>
import { useToast } from 'vue-toastification'


const toast = useToast();

export default {
	data() {
		return {
			password: '',
			symbols: {
				lowercase: {
					name: 'Строчные буквы',
					value: true,
					symbols: 'abcdefghjkmnpqrstuvwxyz'
				},
				uppercase: {
					name: 'Заглавные буквы',
					value: true,
					symbols: 'ABCDEFGHJKMNPQRSTUVWXYZ'
				},
				numbers: {
					name: 'Числа',
					value: true,
					symbols: '123456789'
				},
				spec: {
					name: 'Спецсимволы',
					value: true,
					symbols: '%*?@#$~'
				}
			},
			lengthPass: {
				value: 12,
				length: Array.apply(null, {length: 30 + 1}).map(Number.call, Number).slice(4)
			},
		}
	},
	methods: {
		copy: function (value) {
			this.$copyText(value)
				.then(() => toast.success(`Скопировано: ${value}`))
				.catch((e) => toast.error(e.message))
		},
		generatePassword: function () {
			const charset = Object.values(this.symbols).filter(i => i.value).map(i => i.symbols).join('');

			this.password = '';
			while(this.password.length != this.lengthPass.value) {
				this.password += charset.charAt(Math.floor(Math.random() * charset.length));
			}
		},
	}
}
</script>

<style>

</style>
