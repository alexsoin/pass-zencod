<template>
	<div class="flex flex-col h-full w-full justify-center items-center">
		<h1 class="text-4xl mb-14 flex flex-row gap-3">
			<a href="https://zencod.ru/articles/" target="_blank" class="hover:opacity-50 transition-opacity" title="zencod.ru">
				<img src="../public/favicon.svg" alt="logo zencod.ru" width="40" height="40">
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
					Кол-во символов в пароле
					<select v-model="lengthPass.value" class="rounded transition-colors bg-gray-800 hover:bg-gray-700 p-1 cursor-pointer">
						<option v-for="num in lengthPass.length" :key="num+'select'">{{ num }}</option>
					</select>
				</div>
				<button @click="generatePassword()" class="px-4 py-2 rounded transition-colors bg-gray-800 hover:bg-gray-700">
					<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M6 18.7V21a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H7.1A7 7 0 0 0 19 12a1 1 0 1 1 2 0 9 9 0 0 1-15 6.7zM18 5.3V3a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2h2.9A7 7 0 0 0 5 12a1 1 0 1 1-2 0 9 9 0 0 1 15-6.7z"/></svg>
				</button>
			</div>
		</div>

		<div :class="{ 'opacity-0': !password }" class="flex flex-col gap-4 mt-16 w-full items-end">
			<button @click="copy(password)" class="px-4 py-2 rounded transition-colors bg-gray-800 hover:bg-gray-700">копировать</button>
			<div class="flex justify-center items-center w-full px-8 bg-yellow-500 rounded h-14 text-xl font-light"><code class="text-gray-900 ">{{ password }}</code></div>
		</div>
	</div>

</template>

<script>
import { useToast } from 'vue-toastification'

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
			const toast = useToast()

			this.$copyText(value).then(() => {
				toast.success(`Скопировано: ${value}`);
			}).catch((e) => {
				toast.error(e.message);
			})
		},
		generatePassword: function () {
			this.password = '';
			let charset = '';

			for (const key in this.symbols) {
				if (this.symbols[key].value) {
					charset += this.symbols[key].symbols;
				}
			}

			for (let i = 0, n = charset.length; i < this.lengthPass.value; ++i) {
				this.password += charset.charAt(Math.floor(Math.random() * n));
			}
		},
	}
}
</script>

<style>

</style>
